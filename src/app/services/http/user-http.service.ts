import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReservationInterface} from '../../model/interfaces/reservation.interface';
import {UserInterface} from '../../model/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  url = 'http://localhost:3000/user/';

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<UserInterface[]>(this.url + 'users');
  }

  getUser(id: string){
    return this.httpClient.get<UserInterface>(this.url + 'findUserById=' + id);
  }

  register(data: UserInterface) {
    return this.httpClient.post<UserInterface>(this.url + 'register', data);
  }

  login(data: {email: string, password: string}){
    return this.httpClient.post<UserInterface>(this.url + 'login', data);
  }
}
