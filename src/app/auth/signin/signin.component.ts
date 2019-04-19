import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {UserHttpService} from '../../services/http/user-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  user: {email: string, password: string};


  constructor(private userService: UserService,
              private userHttpService: UserHttpService,
              private router: Router,
  ) { }

  ngOnInit() {
    this.user = {email: '', password: ''};
  }

  async onSignin(form: NgForm){
    this.user.email = form.value.email;
    this.user.password = form.value.password;

    await this.userService.login(this.user);

    this.router.navigate(['home']);
  }

}
