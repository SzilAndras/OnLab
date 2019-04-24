import { Component, OnInit } from '@angular/core';
import {Reservation} from '../../Models/interfaces/reservation';
import {ReservationHttpService} from '../../services/http/reservation-http.service';

@Component({
  selector: 'app-admin-reservation-actual',
  templateUrl: './admin-reservation-actual.component.html',
  styleUrls: ['./admin-reservation-actual.component.css']
})
export class AdminReservationActualComponent implements OnInit {

  statusDropdown = [
    {state: 'All', text: 'Összes'},
    {state: 'Pending', text: 'Függőben'},
    {state: 'Accepted', text: 'Elfogadva'},
  ];

  selectedStatus: string;

  reservations: Reservation[];
  selectedReservation: Reservation;
  plateNumberFiler = '';
  typeFilter = '';

  constructor(private reservationHttpService: ReservationHttpService) { }

  ngOnInit() {
    this.reservations = [];
    this.selectedStatus = this.statusDropdown[0].state;
    this.refreshReservations();
  }

  onSelect(){
    this.refreshReservations();
  }

  refreshReservations() {
    if(this.selectedStatus === 'Pending' || this.selectedStatus === 'Accepted'){
      this.reservationHttpService.getReservationsByState(this.selectedStatus).subscribe(
        (response) => {
          this.reservations = response;
          console.log(response);
        });
    } else {
      this.reservationHttpService.getAllReservation().subscribe(
        (response) => {
          this.reservations = response;
          console.log(response);
        });
    }
  }

}
