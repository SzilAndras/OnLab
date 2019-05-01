import {Component, Input, OnInit} from '@angular/core';
import {ReservationHttpService} from '../../services/http/reservation-http.service';
import {Reservation} from '../../Models/interfaces/reservation';
import {User} from '../../Models/interfaces/user';
import {UserHttpService} from '../../services/http/user-http.service';
import {Appointment} from '../../Models/interfaces/appointment';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-admin-reservation-edit',
  templateUrl: './admin-reservation-edit.component.html',
  styleUrls: ['./admin-reservation-edit.component.css']
})
export class AdminReservationEditComponent implements OnInit {
  @Input() resId: number;
  reservation: Reservation;
  user: User;
  acceptedAppointment: Appointment;

  constructor(
    private resHttpService: ReservationHttpService,
    private userService: UserHttpService) { }

  ngOnInit() {
    this.resHttpService.getReservationById(this.resId).subscribe(
      (response) => {
        this.reservation = response;
        console.log(response);
        this.userService.getUser(this.reservation.userId + '').subscribe(
          (user) => {
            this.user = user;
          }
        );
    });
    console.log(this.resId);
  }

  valuesSum(): {timeSum: number, priceSum: number}{
    const values = {timeSum: 0, priceSum: 0};
    for (const work of this.reservation.works) {
      values.timeSum += +work.time;
      values.priceSum += +work.price;
    }
    return values;
  }

  onSave() {
    console.log(this.reservation);
    this.resHttpService.saveReservation(this.reservation).subscribe(
      (response) => {
        console.log(response);
    },
    (error) => {
        console.log(error);
    }
    );
  }
}
