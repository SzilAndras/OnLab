import { Component, OnInit } from '@angular/core';
import {NewReservationService} from '../../../shared/services/new-reservation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reservation-header',
  templateUrl: './reservation-header.component.html',
  styleUrls: ['./reservation-header.component.css']
})
export class ReservationHeaderComponent implements OnInit {

  constructor(private newReservationService: NewReservationService) { }

  ngOnInit() {
  }

  isSettings(){
    return this.newReservationService.isVehicleSettingsValid();
  }

  isAppointsment() {
    return this.newReservationService.isAppointmentValid();
  }

}
