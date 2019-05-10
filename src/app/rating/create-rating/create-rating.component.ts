import {Component, OnInit, ViewChild} from '@angular/core';
import {RatingInterface} from '../../model/interfaces/rating.interface';
import {RatingHttpService} from '../../services/http/rating-http.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {RatingService} from '../../services/rating.service';

@Component({
  selector: 'app-create-rating',
  templateUrl: './create-rating.component.html',
  styleUrls: ['./create-rating.component.css']
})
export class CreateRatingComponent implements OnInit {
  rating: RatingInterface;
  @ViewChild('f') ratingForm: NgForm;
  pointOptions = [
    {value: 1},
    {value: 2},
    {value: 3},
    {value: 4},
    {value: 5},
  ];

  constructor(private ratingHttpService: RatingHttpService,
              private router: Router,
              private ratingService: RatingService) { }

  ngOnInit() {
    this.rating = {
      points: 0,
      description: '',
    };
  }

  onSave(){
    this.rating.points = this.ratingForm.value.points;
    this.rating.description = this.ratingForm.value.comment;
    this.ratingHttpService.newRating(this.rating).subscribe(
      () => {
        this.ratingForm.resetForm();
        this.ratingService.newRating.emit();
        this.router.navigate(['home/news']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCancel(){
    this.ratingForm.resetForm();
    this.router.navigate(['home/news']);
  }

}
