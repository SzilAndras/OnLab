import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AppointmentHttpService} from '../../services/http/appointment-http.service';
import {DatePipe} from '@angular/common';
import {Appointment} from '../../Models/interfaces/appointment';
import {CellStatus} from '../../Models/enums/cell-status.enum';
import {AppointmentState} from '../../Models/enums/appointment-state.enum';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit, OnChanges {
  @Input() date: Date;
  @Input() resId: number;

  appointments: Appointment[];
  timeTable: Array<{status: CellStatus, time: string}>;

  constructor(
    private appointmentHttpService: AppointmentHttpService,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.resId = 1;
    this.refreshTimeTable(this.date);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('NgOnChange');
    console.log(changes);
  }

  refreshTimeTable(date: Date){
    this.timeTable = [];
    for (let i = 0; i < 15; i++) {
      this.timeTable.push({status: CellStatus.Empty, time: ('' + (8 + (i) * 0.5 ))});
    }
    this.getResAppoints();

  }

  onCellSelected(idx: number){
    console.log('Selected: ' + idx);
    console.log(this.timeTable[idx]);
  }

  getResAppoints(){
    this.appointmentHttpService.getAppointmentsByResId(this.resId).subscribe(
      (resApp) => {
        this.appointments = resApp;
        console.log(this.appointments);
        const dateStr = this.datepipe.transform(this.date, 'yyyy-MM-dd');
        this.appointmentHttpService.getDateAppointments(dateStr).subscribe(
          (response) => {
            console.log('Appointments: ');
            console.log(response);
            for (const cell of this.timeTable) {  // időpontokon végigfut
              for (const app of response) {   // dátum időpontjain végigfut
                if (app.time === cell.time && (app.state === AppointmentState.Accepted || app.state === AppointmentState.Suggested)) {
                  cell.status = CellStatus.Reserved;
                }
              }

              for (const resA of this.appointments){    // jelenlegi foglalás időpontjain végigfut
                if(cell.time === resA.time && resA.state === AppointmentState.Selected && cell.status !== CellStatus.Reserved) {
                  cell.status = CellStatus.Selected;
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
}
