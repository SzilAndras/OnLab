import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AppointmentHttpService} from '../../services/http/appointment-http.service';
import {DatePipe} from '@angular/common';
import {AppointmentInterface} from '../../model/interfaces/appointment.interface';
import {CellStatus} from '../../model/enums/cell-status.enum';
import {AppointmentState} from '../../model/enums/appointment-state.enum';
import {AppointmentType} from '../../model/enums/appointment-type.enum';

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
  @Output() selected = new EventEmitter<AppointmentInterface[]>();

  reservationAppointments: AppointmentInterface[];
  dateAppointments: AppointmentInterface[];
  timeTable: Array<{status: CellStatus, time: string}>;

  selectedAppointment: AppointmentInterface;
  selectedAppointments = new Array<AppointmentInterface>();

  constructor(
    private appointmentHttpService: AppointmentHttpService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.refreshTimeTable(this.date);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('NgOnChange');
    this.refreshTimeTable(this.date);
  }

  refreshTimeTable(date: Date){
    this.timeTable = [];
    for (let i = 0; i < 15; i++) {
      const temp = (8 + (i) * 0.5 );
      this.timeTable.push({status: CellStatus.Empty, time: (
        '' + (temp - temp % 1) + ':' + (temp % 1 > 0 ? '30' : '00'))});
    }
    this.getResAppoints();

  }

  onCellSelected(idx: number){
    if (this.mode === 'single'){
      if (this.abelToSelect.includes(this.timeTable[idx].status)){
        if ( /*this.isAppointmentExist(this.timeTable[idx].time)*/ false) {
          this.selectedAppointment = this.reservationAppointments[idx];
        } else {
          this.selectedAppointment = {
            id: undefined,
            day: this.datepipe.transform(this.date, 'yyyy-MM-dd'),
            time: this.timeTable[idx].time,
            state: this.selectFor,
            type: this.typeFor};
        }
        this.selected.emit([this.selectedAppointment]);
      }
    } else {
      if (
        this.selectedAppointments.length > 0 &&
        this.selectedAppointments.includes(this.dateAppointments[idx]))
      {
          this.selectedAppointments.slice(this.selectedAppointments.indexOf(this.dateAppointments[idx]), 1);
      } else {
        this.selectedAppointments.push(this.dateAppointments[idx]);
      }
      this.selected.emit(this.selectedAppointments);
    }
  }

  getResAppoints(){
    this.appointmentHttpService.getAppointmentsByResId(this.resId).subscribe(
      (resApp) => {
        this.reservationAppointments = resApp;
        console.log(this.reservationAppointments);
        const dateStr = this.datepipe.transform(this.date, 'yyyy-MM-dd');
        this.appointmentHttpService.getDateAppointments(dateStr).subscribe(
          (dateApp) => {
            this.dateAppointments = dateApp;
            for (const cell of this.timeTable) {  // időpontokon végigfut
              for (const app of dateApp) {   // dátum időpontjain végigfut
                if (app.time === cell.time && (app.state === AppointmentState.Accepted || app.state === AppointmentState.Suggested)) {
                  cell.status = CellStatus.Reserved;
                }
              }
              for (const resA of this.reservationAppointments){    // jelenlegi foglalás időpontjain végigfut
                if (new Date(resA.day).toString() === this.date.toString()) {
                  if(cell.time === resA.time && resA.state === AppointmentState.Selected && cell.status !== CellStatus.Reserved) {
                    cell.status = CellStatus.Selected;
                  }
                }
              }
            }
          },
          (error) => {
            console.log(error);
            return [];
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isAppointmentExist(time: string){
    for(let app of this.reservationAppointments){
      if(app.day === this.date.toString() && app.time === time) {
        return true;
      }
    }
    return false;
  }
}
