import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {NewReservationService} from '../services/new-reservation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private resService: NewReservationService) { }

  ngOnInit() {
  }


  public isLoggedIn(): boolean{
    return this.userService.isLoggedIn();
  }

  public logout(){
    this.userService.logout();
    this.router.navigate(['signin']);
    this.resService.refreshReservation();
  }

}
