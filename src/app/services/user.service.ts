import {Injectable, OnInit} from '@angular/core';
import {User} from '../Models/interfaces/user';
import {UserHttpService} from './http/user-http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  constructor(private userHttpService: UserHttpService) { }

  ngOnInit() {
  }

  async login(data: {email: string, password: string}) {
    await this.userHttpService.login(data).subscribe(
      (response) => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_role', response.role);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
  }

  async register(data: User) {
    console.log(data);
    await this.userHttpService.register(data).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_role', response.role);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public isLoggedIn() {
    return (localStorage.getItem('auth_token') !== null && localStorage.getItem('user_role') !== null);
  }

  public getToken() {
    if (this.isLoggedIn()) {
      return localStorage.getItem('auth_token');
    } else {
      return null;
    }
  }

  public getRole() {
    if (this.isLoggedIn()) {
      return localStorage.getItem('user_role');
    } else {
      return null;
    }
  }


}
