import {Component, Input, OnInit} from '@angular/core';
import {ReservationInterface} from '../../../shared/model/interfaces/reservation.interface';
import {ReservationHttpService} from '../../../shared/services/http/reservation-http.service';
import {ActualReservationsService} from '../../../shared/services/actual-reservations.service';
import {Status} from '../../../shared/model/enums/status.enum';
import {FilterInterface} from '../../../shared/model/interfaces/filter.interface';
import {FilterStatus} from '../../../shared/model/enums/filter-status.enum';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  @Input() filter: FilterInterface;
  reservations: ReservationInterface[] = [];
  selectedId: number;


  constructor(
    private readonly resHttpService: ReservationHttpService,
    private readonly actualReservationService: ActualReservationsService
  ) { }

  ngOnInit() {
    this.selectedId = -1;
    this.refreshReservations();
    this.actualReservationService.elementModified.subscribe(
      (reservationId: number) => {
        this.refreshReservations();
        this.selectedId = reservationId;
      }
    );

  }

  onSelect(id: number){
    this.actualReservationService.elementSelected.emit(id);
    this.selectedId = id;
  }

  refreshReservations() {
    this.resHttpService.getUserReservations().subscribe(
      (response) => {
        this.reservations = response;
      },
      (error) => {
        console.log(error);
      });
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

}
