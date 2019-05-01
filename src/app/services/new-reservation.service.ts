import {Injectable, OnInit} from '@angular/core';
import {Reservation} from '../Models/interfaces/reservation';
import {DatePipe} from '@angular/common';
import {UserService} from './user.service';
import {CellStatus} from '../Models/enums/cell-status.enum';
import {ReservationHttpService} from './http/reservation-http.service';
import {AppointmentState} from '../Models/enums/appointment-state.enum';
import {Status} from '../Models/enums/status.enum';
import {AppointmentHttpService} from './http/appointment-http.service';

@Injectable({
  providedIn: 'root'
})
export class NewReservationService implements OnInit{
  private _reservation: Reservation;
  private _timeTable: Array<{status: CellStatus, time: string}>;

  constructor(
    private datepipe: DatePipe,
    private userService: UserService,
    private reservationHttp: ReservationHttpService,
    private appointmentHttpService: AppointmentHttpService
    ) {
    this.refreshReservation();
  }

  ngOnInit(): void {
  }



  get reservation(): Reservation {
    return this._reservation;
  }

  set reservation(value: Reservation) {
    this._reservation = value;
  }


  get timeTable(): Array<{status: CellStatus, time: string}> {
    return this._timeTable;
  }

  set timeTable(value: Array<{status: CellStatus, time: string}>) {
    this._timeTable = value;
  }

  refreshReservation() {
    this.reservation = {
      comments: [],
      appointments: [],
      works: [],
      plateNumber: '',
      vehicleType: '',
      state: Status.Pending,
      vin: '',
    };
    this.timeTable = [];
    for (let i = 0; i < 15; i++) {
      this.timeTable.push({status: CellStatus.Empty, time: ('' + (8 + (i) * 0.5 ))});
    }
  }

  refreshTimeTable(date: Date){
    this.timeTable = [];
    for (let i = 0; i < 15; i++) {
      this.timeTable.push({status: CellStatus.Empty, time: ('' + (8 + (i) * 0.5 ))});
    }
    const dateStr = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.appointmentHttpService.getDateAppointments(dateStr).subscribe(
      (response) => {
        for (const cell of this.timeTable) {
          for (const app of response) {
            if (app.time === cell.time && (app.state === AppointmentState.Accepted || app.state === AppointmentState.Suggested)){
              cell.status = CellStatus.Reserved;
              console.log(cell);
              console.log(app);
            }
          }
        }
      },
      (error) => {
        console.log(error);
        return [];
      }
    );
  }
}
