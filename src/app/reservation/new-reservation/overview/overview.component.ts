import { Component, OnInit } from '@angular/core';
import {NewReservationService} from '../../../shared/services/new-reservation.service';
import {Router} from '@angular/router';
import {ReservationHttpService} from '../../../shared/services/http/reservation-http.service';
import {ReservationInterface} from '../../../shared/model/interfaces/reservation.interface';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  comment: string;
  reservation: ReservationInterface;

  constructor(
    private router: Router,
    public resService: NewReservationService,
    private reservationHttp: ReservationHttpService) { }

  ngOnInit() {
    this.comment = '';
    this.reservation = this.resService.reservation;
    if(this.resService.reservation.comments[0] !== undefined){
      this.comment = this.resService.reservation.comments[0].comment;
    }
  }


  async onConfirm() {
    if(this.resService.reservation.comments[0].comment === undefined){
      this.resService.reservation.comments = [];
    }
    await this.reservationHttp.saveReservation(this.resService.reservation).subscribe((response) => {
      console.log('Response: ');
      console.log(response);
      console.log(this.resService.reservation);
      setTimeout(() =>
        {
          this.router.navigate(['actual-reservations']);
          this.resService.refreshReservation();
        },
        300);
    });
  }

  isValid(){
    return this.resService.isAppointmentValid() && this.resService.isVehicleSettingsValid();
  }

  onBack(){
    this.router.navigate(['new-reservation/appointment']);
  }

}
