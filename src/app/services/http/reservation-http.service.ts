import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Reservation} from '../../Models/interfaces/reservation';
import {Appointment} from '../../Models/interfaces/appointment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationHttpService {

  constructor(private httpClient: HttpClient) { }

  getAllReservation() {
    return this.httpClient.get<Reservation[]>('http://localhost:3000/reservation/findAll');
  }

  getReservationById(id: number){
    return this.httpClient.get<Reservation>('http://localhost:3000/reservation/findById/' + id);
  }

  createNewReservation(reservation: Reservation) {
    return this.httpClient.post('http://localhost:3000/reservation/save', reservation);
  }

  getUserReservations(id: number){
    return this.httpClient.get<Reservation[]>('http://localhost:3000/reservation/findByUserId=' + id);
  }

  getDateAppointments(dateStr: string){
    return this.httpClient.get<Appointment[]>('http://localhost:3000/appointment/findAppointmentsByDate=' + dateStr);
  }

}
