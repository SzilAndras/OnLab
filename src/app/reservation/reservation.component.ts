import { Component, OnInit } from '@angular/core';
import {ReservationService} from '../services/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  constructor(private resService: ReservationService) { }

  ngOnInit() {
  }

}
