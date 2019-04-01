import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {Reservation} from '../Models/reservation';
import {HttpClient} from '@angular/common/http';
import {forEach} from '@angular/router/src/utils/collection';
import {DatePipe} from '@angular/common';
import {UserService} from './user.service';
import {CellStatus} from '../Models/cell-status.enum';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _reservation: Reservation;
  private _timeTable: Array<CellStatus>;

  constructor(private http: HttpClient, private datepipe: DatePipe, private userService: UserService) {
    this.reservation = new Reservation(this.userService.userId);
    this.timeTable = new Array<CellStatus>();
    for (let i = 0; i < 15; i++) {
      this.timeTable.push(CellStatus.Empty);
    }
  }



  get reservation(): Reservation {
    return this._reservation;
  }

  set reservation(value: Reservation) {
    this._reservation = value;
  }


  get timeTable(): Array<CellStatus> {
    return this._timeTable;
  }

  set timeTable(value: Array<CellStatus>) {
    this._timeTable = value;
  }

  getAll(): Object {
    return this.http.get('http://localhost:3000/reservation/findAll')
      .subscribe((response: Response) => {
        console.log(response);
      });
  }

  create(): void {
    let worksStr = '';
    this.reservation.works.forEach(function (work) {
      worksStr = worksStr + ' ' + work.work;
    });

    let res = {
      reservationId: 0,
      userId: this.reservation.userID,
      vehicleType: this.reservation.vehicleType,
      plateNumber: this.reservation.plateNumber,
      vin: this.reservation.vin,
      works: worksStr,
      appointment: this.reservation.appointment.day, /*this.datepipe.transform(this.reservation.appointment.day, 'yyyy-MM-dd'),*/
      comments: 'comments',
      state: this.reservation.state,
      suggestedAppointment: 'ap'
    };
    this.http.post('http://localhost:3000/reservation/save', res).subscribe();
    this.reservation = new Reservation(this.userService.userId);
    this.timeTable = new Array<CellStatus>();
    for (let i = 0; i < 15; i++) {
      this.timeTable.push(CellStatus.Empty);
    }
  }
}
