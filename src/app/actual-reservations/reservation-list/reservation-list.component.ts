import { Component, OnInit } from '@angular/core';
import {Reservation} from '../../Models/interfaces/reservation';
import {UserService} from '../../services/user.service';
import {ReservationHttpService} from '../../services/http/reservation-http.service';
import {map} from 'rxjs/operators';
import {ActualReservationsService} from '../../services/actual-reservations.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(
    private readonly resHttpService: ReservationHttpService,
    private readonly userService: UserService,
    private readonly selectService: ActualReservationsService
  ) { }

  ngOnInit() {
    this.resHttpService.getUserReservations(this.userService.userId).subscribe(
      (response) => {
        this.reservations = response;
        console.log(this.reservations);
      },
    (error) => {
        console.log(error);
    });
  }

  onSelect(id: number){
    this.selectService.elementSelected.emit(id);
  }

}
