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

  getReservationById(id: number){
    return this.httpClient.get<Reservation>(this.url + 'findById/' + id);
  }

  createNewReservation(reservation: Reservation) {
    return this.httpClient.post(this.url + 'save', reservation);
  }

  getUserReservations(){
    return this.httpClient.get<Reservation[]>(this.url + 'findByUser');
  }

  getDateAppointments(dateStr: string){
    return this.httpClient.get<Appointment[]>('http://localhost:3000/appointment/findAppointmentsByDate=' + dateStr);
  }

}
