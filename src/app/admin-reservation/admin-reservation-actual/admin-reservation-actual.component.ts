import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReservationInterface} from '../../model/interfaces/reservation.interface';
import {ReservationHttpService} from '../../services/http/reservation-http.service';
import {Router} from '@angular/router';
import {FilterInterface} from '../../model/interfaces/filter.interface';
import {FilterStatus} from '../../model/enums/filter-status.enum';
import {Status} from '../../model/enums/status.enum';

@Component({
  selector: 'app-admin-reservation-actual',
  templateUrl: './admin-reservation-actual.component.html',
  styleUrls: ['./admin-reservation-actual.component.css']
})
export class AdminReservationActualComponent implements OnInit {
  filter: FilterInterface;
  @Output() filterSet: EventEmitter<FilterInterface> = new EventEmitter();
  reservations: ReservationInterface[] = [];


  constructor(
    private reservationHttpService: ReservationHttpService,
    private router: Router) { }

  ngOnInit() {
    if (this.filter === undefined){
      this.filter = {status: FilterStatus.All, type: '', plateNumber: ''};
    }
    this.refreshReservations();
  }

  refreshReservations() {
      this.reservationHttpService.getAllReservation().subscribe(
        (response) => {
          this.reservations = response;
          console.log(response);
        });
  }

  onSelect(reId: number){
    this.router.navigate(['/admin-reservations/isEdited/' + reId ]);
  }

  setFilter(filter: FilterInterface){
    this.filter = filter;
    this.filterSet.emit(filter);
  }

  reservationStatus(reservation: ReservationInterface) {
    if(reservation.adminStatus === Status.Accepted && reservation.userStatus === Status.Accepted){
      return FilterStatus.Accepted;
    } else if (reservation.adminStatus === Status.Rejected || reservation.userStatus === Status.Rejected){
      return FilterStatus.Rejected;
    } else if ((!(reservation.adminStatus === Status.Accepted) ||
      (reservation.adminStatus === Status.Accepted && !(reservation.userStatus === Status.Accepted)))){
      return FilterStatus.Pending;
    } else {
      return FilterStatus.All;
    }
  }

  init(filter: FilterInterface){
    this.filter = filter;
  }


}
