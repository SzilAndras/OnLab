import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {UserHttpService} from '../../shared/services/http/user-http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('f') signinForm: NgForm;
  user: {email: string, password: string};


  constructor(private userService: UserService,
              private userHttpService: UserHttpService,
              private router: Router,
  ) { }

  ngOnInit() {
    this.user = {email: '', password: ''};
  }

  async onSignin(){
    console.log(this.signinForm);
    this.user.email = this.signinForm.value.email;
    this.user.password = this.signinForm.value.password;

    await this.userService.login(this.user).then((response) => {
      this.router.navigate(['home']);
    });

/*
    this.router.navigate(['home']);
*/
  }

  onSubmite(){

  }

}
