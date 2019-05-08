import { Component, OnInit } from '@angular/core';
import {RatingInterface} from '../../model/interfaces/rating.interface';
import {RatingHttpService} from '../../services/http/rating-http.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit {
  ratings: RatingInterface[];
  constructor(private ratingHttpService: RatingHttpService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.ratingHttpService.getAllRating().subscribe(
      (response) => {
        this.ratings = response;
      }, (error) => {
        console.log(error);
      }
    );
  }

  onRating(){
    this.router.navigate(['home/rating']);
  }

  isAvailable(){
    return (!this.userService.isAdmin() && this.userService.isLoggedIn());
  }

}
