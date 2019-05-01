import { Component, OnInit } from '@angular/core';
import {Reservation} from '../Models/interfaces/reservation';
import {ReservationHttpService} from '../services/http/reservation-http.service';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.css']
})
export class AdminReservationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  adminResCompFiltered(filter){
    console.log('FILTER:  ');
    console.log(filter);
  }

}
