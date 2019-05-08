import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserInterface} from '../../model/interfaces/user.interface';
import {UserService} from '../../services/user.service';
import {UserHttpService} from '../../services/http/user-http.service';
import {Router} from '@angular/router';
import {NewReservationService} from '../../services/new-reservation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: UserInterface;
  @ViewChild('f') signupForm: NgForm;
  password1;
  password2;

  constructor(private userService: UserService,
              private userHttpService: UserHttpService,
              private router: Router,
              private resService: NewReservationService
  ) { }

  ngOnInit() {
    this.user = {
      email: '',
      fullName: '',
      phoneNumber: '',
      password: ''
    };
  }

  async onSignup() {
    this.user = {
      email: this.signupForm.value.email,
      fullName: this.signupForm.value.fullName,
      phoneNumber: this.signupForm.value.phoneNumber,
      password: this.signupForm.value.password
    };
    this.userService.register(this.user).then((response) => {
      this.router.navigate(['home']);
    });
  }
}
