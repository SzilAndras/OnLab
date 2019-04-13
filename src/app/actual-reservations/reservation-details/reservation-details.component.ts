import { Component, OnInit } from '@angular/core';
import {ActualReservationsService} from '../../services/actual-reservations.service';
import {Reservation} from '../../Models/interfaces/reservation';
import {ReservationHttpService} from '../../services/http/reservation-http.service';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {
  id: number;
  reservation: Reservation;

  constructor(
    private readonly selectedService: ActualReservationsService,
    private readonly reservationHttpService: ReservationHttpService
  ) { }

  ngOnInit() {
    this.selectedService.elementSelected.subscribe(
      (resId: number) => {
        this.reservationHttpService.getReservationById(resId).subscribe((reservation) => {
          console.log(reservation);
          this.reservation = reservation;
        });
      }
    );
  }

}
