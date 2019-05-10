import {Component, EventEmitter, OnInit} from '@angular/core';
import {FilterInterface} from '../model/interfaces/filter.interface';

@Component({
  selector: 'app-admin-reservation',
  templateUrl: './admin-reservation.component.html',
  styleUrls: ['./admin-reservation.component.css']
})
export class AdminReservationComponent implements OnInit {
  filter: FilterInterface;

  constructor() { }

  ngOnInit() {}

  onActivate(componentReference) {
    componentReference.init(this.filter);
    componentReference.filterSet = new EventEmitter<FilterInterface>();
    componentReference.filterSet.subscribe(
      (filter) => {
        this.filter = filter;
      }
    );
  }

}
