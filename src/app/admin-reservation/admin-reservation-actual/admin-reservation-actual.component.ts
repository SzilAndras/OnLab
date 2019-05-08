import { Component, OnInit } from '@angular/core';
import {ReservationInterface} from '../../model/interfaces/reservation.interface';
import {ReservationHttpService} from '../../services/http/reservation-http.service';
import {Router} from '@angular/router';

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

  reservations: ReservationInterface[];
  selectedReservation: ReservationInterface;
  plateNumberFiler = '';
  typeFilter = '';

  constructor(
    private reservationHttpService: ReservationHttpService,
    private router: Router) { }

  ngOnInit() {
    this.reservations = [];
    this.selectedStatus = this.statusDropdown[0].state;
    this.refreshReservations();
  }

  onSelect(){
    this.refreshReservations();
  }

  refreshReservations() {
    console.log('admin-reservations');
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

  onResSelect(reId: number){
    this.router.navigate(['/admin-reservations/isEdited/' + reId ]);

  }


}
