import {Component, OnInit} from '@angular/core';
import {FilterInterface} from '../model/interfaces/filter.interface';
import {FilterStatus} from '../model/enums/filter-status.enum';

@Component({
  selector: 'app-actual-reservations',
  templateUrl: './actual-reservations.component.html',
  styleUrls: ['./actual-reservations.component.css']
})
export class ActualReservationsComponent implements OnInit {
  filter: FilterInterface;

  constructor() { }

  ngOnInit() {
    this.filter = {status: FilterStatus.All, type: '', plateNumber: ''};
  }

  setFilter(filter: FilterInterface){
    this.filter = filter;
  }

}
