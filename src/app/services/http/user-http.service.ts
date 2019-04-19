import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Reservation} from '../../Models/interfaces/reservation';
import {User} from '../../Models/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  url = 'http://localhost:3000/user/';

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get<User[]>(this.url + 'users');
  }

  register(data: User) {
    return this.httpClient.post<User>(this.url + 'register', data);
  }

  login(data: {email: string, password: string}){
    return this.httpClient.post<User>(this.url + 'login', data);
  }
}
