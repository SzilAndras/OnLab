import { Injectable } from '@angular/core';
import {Appointment} from '../../Models/interfaces/appointment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentHttpService {
  url = 'http://localhost:3000/appointment/';

  constructor(private httpClient: HttpClient) { }

  getDateAppointments(dateStr: string){
    return this.httpClient.get<Appointment[]>(this.url + 'findAppointmentsByDate=' + dateStr);
  }

  updateAppointments(appointments: Appointment[]){
    return this.httpClient.post(this.url + 'updateAppointments',  appointments);
  }

  deleteAppointments(appointments: Appointment[]){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: appointments
    };
    return this.httpClient.delete(this.url + 'deleteAppointments',  httpOptions);
  }

  getAppointmentsByResId(resId: number){
    return this.httpClient.get<Appointment[]>(this.url + 'findAppointmentsResId=' + resId);
  }

}
