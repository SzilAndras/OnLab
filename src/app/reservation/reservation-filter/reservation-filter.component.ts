import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterInterface} from '../../shared/model/interfaces/filter.interface';
import {FilterStatus} from '../../shared/model/enums/filter-status.enum';

@Component({
  selector: 'app-reservation-filter',
  templateUrl: './reservation-filter.component.html',
  styleUrls: ['./reservation-filter.component.css']
})
export class ReservationFilterComponent implements OnInit{
  @Input() initFilter: FilterInterface;
  @Output() filtered = new EventEmitter<FilterInterface>();

  statusDropdown = [
    {state: FilterStatus.All, text: 'Összes'},
    {state: FilterStatus.Pending, text: 'Függőben'},
    {state: FilterStatus.Accepted, text: 'Elfogadva'},
    {state: FilterStatus.Rejected, text: 'Elutasítva'}
  ];
  filter: FilterInterface;


  constructor() { }

  ngOnInit() {
    if (this.initFilter.status !== undefined){
      this.filter = {
        status: this.initFilter.status,
        plateNumber: this.initFilter.plateNumber,
        type: this.initFilter.type
      };
    } else {
      this.filter.plateNumber = '';
      this.filter.type = '';
      this.filter.status = FilterStatus.All;
    }
  }

  onSelect(){
    this.filtered.emit(this.filter);
  }

  change(){
    this.filtered.emit(this.filter);
  }
}
