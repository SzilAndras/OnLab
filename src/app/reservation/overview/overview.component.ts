import { Component, OnInit } from '@angular/core';
import {ReservationService} from '../../services/reservation.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  constructor(public resService: ReservationService) { }

  ngOnInit() {
  }

  onConfirm(){
    this.resService.create();
  }

}
