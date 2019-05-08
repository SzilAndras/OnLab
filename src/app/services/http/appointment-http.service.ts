import { Injectable } from '@angular/core';
import {AppointmentInterface} from '../../model/interfaces/appointment.interface';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentHttpService {
  url = 'http://localhost:3000/appointment/';

  constructor(private httpClient: HttpClient) { }

  getDateAppointments(dateStr: string){
    return this.httpClient.get<AppointmentInterface[]>(this.url + 'findAppointmentsByDate=' + dateStr);
  }

  updateAppointments(appointments: AppointmentInterface[]){
    return this.httpClient.post(this.url + 'updateAppointments',  appointments);
  }

  deleteAppointments(appointments: AppointmentInterface[]){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: appointments
    };
    return this.httpClient.delete(this.url + 'deleteAppointments',  httpOptions);
  }

  getAppointmentsByResId(resId: number){
    return this.httpClient.get<AppointmentInterface[]>(this.url + 'findAppointmentsResId=' + resId);
  }

}
