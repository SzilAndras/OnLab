import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AppointmentHttpService} from '../../shared/services/http/appointment-http.service';
import {DatePipe} from '@angular/common';
import {AppointmentInterface} from '../../shared/model/interfaces/appointment.interface';
import {CellStatus} from '../../shared/model/enums/cell-status.enum';
import {AppointmentState} from '../../shared/model/enums/appointment-state.enum';
import {AppointmentType} from '../../shared/model/enums/appointment-type.enum';
import {TimeCellInterface} from '../../shared/model/interfaces/time-cell.interface';
import {CellType} from '../../shared/model/enums/cell-type.enum';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit, OnChanges {
  @Input() date: Date;
  @Input() resId: number;
  @Input() mode: string;
  @Input() abelToSelect: CellStatus[];
  @Input() selectFor: AppointmentState;
  @Input() typeFor: AppointmentType;
  @Input() selectedWorks: AppointmentInterface[];
  @Input() selectedHandover: AppointmentInterface;
  @Input() selectedTakeover: AppointmentInterface;
  @Output() selected = new EventEmitter<AppointmentInterface[]>();

  reservationAppointments: AppointmentInterface[];
  dateAppointments: AppointmentInterface[];
  timeTable: TimeCellInterface[];
  selectedAppointment: AppointmentInterface;
  selectedAppointments: AppointmentInterface[] = [];

  constructor(
    private appointmentHttpService: AppointmentHttpService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    if(this.selectedWorks === undefined){
      this.selectedWorks = [];
    }
    if (this.selectedAppointments === undefined) {
      this.selectedAppointments = [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('NgOnChange');
    this.refreshTimeTable();
  }

  refreshTimeTable(){
    this.timeTable = [];
    for (let i = 0; i < 15; i++) {
      const temp = (8 + (i) * 0.5 );
      this.timeTable.push({
        status: CellStatus.Empty,
        type: CellType.Empty,
        time: (
        '' + (temp - temp % 1) + ':' + (temp % 1 > 0 ? '30' : '00')),
      isCurrent: false});
    }

    this.getResAppoints();
  }

  onCellSelected(idx: number){
    if (this.mode === 'single') {
      if (this.isSelectable(idx)) {
        this.selectedAppointment = {
            id: undefined,
            day: this.datepipe.transform(this.date, 'yyyy-MM-dd'),
            time: this.timeTable[idx].time,
            state: this.selectFor,
            type: this.typeFor};
        this.selected.emit([this.selectedAppointment]);

      }
    } else if (this.mode === 'array') {
      if (this.isSelectable(idx)) {
        this.selectedAppointment = {
          id: undefined,
          day: this.datepipe.transform(this.date, 'yyyy-MM-dd'),
          time: this.timeTable[idx].time,
          state: this.selectFor,
          type: this.typeFor};
        if (this.isSelectedIncludes(this.selectedAppointment)) {
          this.selectedAppointments.splice(this.indexOfInSelected(this.selectedAppointment), 1);
          this.timeTable[idx].status = CellStatus.Empty;
          this.timeTable[idx].type = CellType.Empty;
          this.timeTable[idx].isCurrent = false;
        } else {
          this.selectedAppointments.push(this.selectedAppointment);
        }
      }
      this.selected.emit(this.selectedAppointments);
    }
    this.refreshAlreadySelected(idx);
  }

  async getResAppoints() {
    if (this.resId !== undefined){
      await this.appointmentHttpService.getAppointmentsByResId(this.resId).subscribe(
        (resApp) => {
          this.reservationAppointments = resApp;
          this.getDateAppointments();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.reservationAppointments = [];
      await this.getDateAppointments();
    }
  }

  isSelectable(idx: number){
    return this.abelToSelect.includes(this.timeTable[idx].status) &&
      ((this.typeFor === AppointmentType.Takeover ?
        this.timeTable[idx].type === CellType.Takeover :
        this.timeTable[idx].type === CellType.Empty) ||
      (this.typeFor === AppointmentType.Work ?
        this.timeTable[idx].type === CellType.Work && this.timeTable[idx].status === CellStatus.Chosen :
        this.timeTable[idx].type === CellType.Empty));
  }

  appTypeToCellType(appType: AppointmentType){
    if (appType === AppointmentType.Handover){
      return CellType.Handover;
    } else if (appType === AppointmentType.Work){
      return CellType.Work;
    } else if (appType === AppointmentType.Takeover){
      return CellType.Takeover;
    } else {
      return CellType.Empty;
    }
  }

  refreshAlreadySelected(idx: number){
    const cell = this.timeTable[idx];
    if (this.mode === 'single'){
      let isChosen = false;
      if (cell.status === CellStatus.Chosen) {
        isChosen = true;
      }
      for (const resA of this.selectedWorks) {    // már kiválasztottakon végigfutás
        this.handleCell(resA, cell, isChosen);
      }
      if (this.selectedTakeover !== undefined){
        this.handleCell(this.selectedTakeover, cell, isChosen);
      }
      if (this.selectedHandover !== undefined){
        this.handleCell(this.selectedHandover, cell, isChosen);
      }
      if (isChosen) {
        cell.status = CellStatus.Empty;
        cell.type = CellType.Empty;
        cell.isCurrent = false;
      }
    } else if (this.mode === 'array'){
      console.log(this.timeTable);
      for (const app of this.selectedAppointments){
        if(cell.time === app.time) {
          cell.status = CellStatus.Chosen;
          cell.type = CellType.Takeover;
          cell.isCurrent = true;
        }
      }
    }

  }

  handleCell(appointment: AppointmentInterface, cell: TimeCellInterface, isChosen: boolean){
    if (this.datepipe.transform(new Date(appointment.day), 'yyyy-MM-dd') === this.datepipe.transform(this.date, 'yyyy-MM-dd')) {
      if (cell.time === appointment.time) {
        if (this.typeFor ===  appointment.type) {
          cell.status = CellStatus.Chosen;
          cell.type = this.appTypeToCellType(appointment.type);
          cell.isCurrent = true;
          isChosen = false;
        } else {
          cell.status = CellStatus.Reserved;
          cell.type = this.appTypeToCellType(appointment.type);
          cell.isCurrent = true;
        }
      }
    }
  }

  getCellText(idx: number){
    const cell = this.timeTable[idx];
    if (cell.isCurrent){
      return (cell.type === CellType.Work ? 'Munka' :
        cell.type === CellType.Takeover && (cell.status === CellStatus.Chosen || cell.status === CellStatus.Reserved) ? 'Átvétel' :
          cell.type === CellType.Handover ? 'Átadás' :
            'Szabad');
    } else {
      return (this.isSelectable(idx) ? 'Szabad' : 'Foglalt');
    }
  }

  getDateAppointments(){
    const dateStr = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    this.appointmentHttpService.getDateAppointments(dateStr).subscribe(
      (dateApp) => {
        this.dateAppointments = dateApp;
        for (const cell of this.timeTable) {  // időpontokon végigfut
          for (const app of dateApp) {   // dátum időpontjain végigfut
            if (app.time === cell.time && (app.state === AppointmentState.Accepted || app.state === AppointmentState.Suggested)) {
              cell.status = CellStatus.Reserved;
              cell.type = this.appTypeToCellType(app.type);
            }
          }
          for (const resA of this.reservationAppointments) {  // jelenlegi foglalás időpontjain végigfut
            if (new Date(resA.day).toString() === this.date.toString()) {
              if(cell.time === resA.time && resA.state === AppointmentState.Selected && cell.status !== CellStatus.Reserved) {
                cell.status = CellStatus.Selected;
                cell.type = this.appTypeToCellType(resA.type);
              }
            }
          }
          this.refreshAlreadySelected(this.timeTable.indexOf(cell));
        }

      },
      (error) => {
        console.log(error);
        return [];
      }
    );
  }

  isSelectedIncludes(appointment: AppointmentInterface) {
    for (const app of this.selectedAppointments) {
      if (app.time === appointment.time && app.day === appointment.day) {
        return true;
      }
    }
    return false;
  }

  indexOfInSelected(appointment: AppointmentInterface){
    for (let i = 0; i < this.selectedAppointments.length; i++) {
      if (this.selectedAppointments[i].time === appointment.time && this.selectedAppointments[i].day === appointment.day) {
        return i;
      }
    }
    return -1;
  }
}
