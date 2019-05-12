import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReservationInterface} from '../../model/interfaces/reservation.interface';
import {AppointmentInterface} from '../../model/interfaces/appointment.interface';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationHttpService {
  url = 'http://localhost:3000/reservation/';

  constructor(private httpClient: HttpClient) { }

  getAllReservation() {
    return this.httpClient.get<ReservationInterface[]>(this.url + 'findAll');
  }

  getReservationsByState(state: String) {
    return this.httpClient.get<ReservationInterface[]>(this.url + 'findByState/' + state);
  }

  getReservationById(id: number){
    return this.httpClient.get<ReservationInterface>(this.url + 'findById/' + id);
  }

  saveReservation(reservation: ReservationInterface) {
    console.log(reservation);
    return this.httpClient.post(this.url + 'save', reservation);
  }

  getUserReservations(){
    return this.httpClient.get<ReservationInterface[]>(this.url + 'findByUser');
  }

  confirmReservation(reservation: ReservationInterface){
    return this.httpClient.post<ReservationInterface>(this.url + 'confirmReservation', reservation);
  }

  suggestReservation(reservation: ReservationInterface){
    return this.httpClient.post<ReservationInterface>(this.url + 'suggestReservation', reservation);
  }

  rejectReservation(reservation: ReservationInterface){
    return this.httpClient.post<ReservationInterface>(this.url + 'rejectReservation', reservation);
  }
}
