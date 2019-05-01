import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Reservation} from '../../Models/interfaces/reservation';
import {Appointment} from '../../Models/interfaces/appointment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationHttpService {
  url = 'http://localhost:3000/reservation/';

  constructor(private httpClient: HttpClient) { }

  getAllReservation() {
    return this.httpClient.get<Reservation[]>(this.url + 'findAll');
  }

  getReservationsByState(state: String) {
    return this.httpClient.get<Reservation[]>(this.url + 'findByState/' + state);
  }

  getReservationById(id: number){
    return this.httpClient.get<Reservation>(this.url + 'findById/' + id);
  }

  saveReservation(reservation: Reservation) {
    console.log(reservation);
    return this.httpClient.post(this.url + 'save', reservation);
  }

  getUserReservations(){
    return this.httpClient.get<Reservation[]>(this.url + 'findByUser');
  }
}
