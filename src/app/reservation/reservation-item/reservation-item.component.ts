import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReservationInterface} from '../../shared/model/interfaces/reservation.interface';
import {Status} from '../../shared/model/enums/status.enum';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.css']
})
export class ReservationItemComponent implements OnInit {
  @Input() reservation: ReservationInterface;
  @Input() isSelected: boolean;
  @Output() selected = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onSelect() {
    console.log('res-item-selected');
    this.selected.emit(this.reservation.id);
  }

  isAccepted() {
    return this.reservation.adminStatus === Status.Accepted && this.reservation.userStatus === Status.Accepted;
  }

  isRejected() {
    return this.reservation.adminStatus === Status.Rejected || this.reservation.userStatus === Status.Rejected;
  }

  isPending() {
    return (!(this.reservation.adminStatus === Status.Accepted) && !this.isRejected());
  }

  isAcceptable() {
    return this.reservation.adminStatus === Status.Accepted && !(this.reservation.userStatus === Status.Accepted) && !this.isRejected();
  }

}
