import { Component, OnInit } from '@angular/core';
import {RatingInterface} from '../../../shared/model/interfaces/rating.interface';
import {RatingHttpService} from '../../../shared/services/http/rating-http.service';
import {Router} from '@angular/router';
import {UserService} from '../../../shared/services/user.service';
import {RatingService} from '../../../shared/services/rating.service';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.css']
})
export class RatingListComponent implements OnInit {
  // TODO emitter
  ratings: RatingInterface[];
  pageRatings: RatingInterface[];
  page: number;

  constructor(private ratingHttpService: RatingHttpService,
              private router: Router,
              private userService: UserService,
              private ratingService: RatingService){}

  ngOnInit() {
    this.page = 0;
    this.pageRatings = [];
    this.refreshRatings();
    this.ratingService.newRating.subscribe(
      () => {
        this.refreshRatings();
      }
    );
  }

  onRating(){
    this.router.navigate(['home/rating']);
  }

  isAvailable(){
    return (!this.userService.isAdmin() && this.userService.isLoggedIn());
  }

  nextPage() {
    this.page = (this.page + 1 <= this.ratings.length / 5 ? this.page + 1 : this.page);
    this.setPageRatings();
  }

  previousPage() {
    this.page = (this.page - 1 >= 1 ? this.page - 1 : 0);
    this.setPageRatings();
  }

  setPageRatings(){
    const pageRatingsTemp = [];
    for(
      let i = this.page * 5;
      i < ((this.page * 5 + 5) <= this.ratings.length ? (this.page * 5 + 5) : this.ratings.length);
      i++) {
      pageRatingsTemp.push(this.ratings[i]);
    }
    this.pageRatings = pageRatingsTemp;
  }

  refreshRatings() {
    this.ratingHttpService.getAllRating().subscribe(
      (response) => {
        this.ratings = response;
        this.setPageRatings();
      }, (error) => {
        console.log(error);
      }
    );
  }

  // TODO backend oldalra átvinni a pageinget

}
