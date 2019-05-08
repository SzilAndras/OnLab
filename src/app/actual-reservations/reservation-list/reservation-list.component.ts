import {Component, OnInit} from '@angular/core';
import {ReservationInterface} from '../../model/interfaces/reservation.interface';
import {ReservationHttpService} from '../../services/http/reservation-http.service';
import {ActualReservationsService} from '../../services/actual-reservations.service';
import {Status} from '../../model/enums/status.enum';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: ReservationInterface[] = [];

  constructor(
    private readonly resHttpService: ReservationHttpService,
    private readonly selectService: ActualReservationsService
  ) { }

  ngOnInit() {
    this.resHttpService.getUserReservations().subscribe(
      (response) => {
        this.reservations = response;
      },
    (error) => {
        console.log(error);
    });
  }

  onSelect(id: number){
    this.selectService.elementSelected.emit(id);
  }

  isAcceptedByAdmin(reservation: ReservationInterface){
    return reservation.adminStatus === Status.Accepted;
  }

  isAcceptedByUser(reservation: ReservationInterface) {
    return reservation.userStatus === Status.Accepted;
  }

  isRejected(reservation: ReservationInterface) {
    return (reservation.userStatus === Status.Rejected || reservation.adminStatus === Status.Rejected );
  }

}
