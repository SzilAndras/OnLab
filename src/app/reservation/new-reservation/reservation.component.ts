import { Component, OnInit } from '@angular/core';
import {NewReservationService} from '../../shared/services/new-reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private resService: NewReservationService) { }

  ngOnInit() {
  }

}
