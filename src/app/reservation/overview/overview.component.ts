import { Component, OnInit } from '@angular/core';
import {NewReservationService} from '../../services/new-reservation.service';
import {Router} from '@angular/router';
import {ReservationHttpService} from '../../services/http/reservation-http.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  comment: string;

  constructor(
    private router: Router,
    public resService: NewReservationService,
    private reservationHttp: ReservationHttpService) { }

  ngOnInit() {
    this.comment = '';
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

}
