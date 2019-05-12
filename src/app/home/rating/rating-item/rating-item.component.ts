import {Component, Input, OnInit} from '@angular/core';
import {RatingHttpService} from '../../../shared/services/http/rating-http.service';
import {RatingInterface} from '../../../shared/model/interfaces/rating.interface';

@Component({
  selector: 'app-rating-item',
  templateUrl: './rating-item.component.html',
  styleUrls: ['./rating-item.component.css']
})
export class RatingItemComponent implements OnInit {
  @Input() rating: RatingInterface;

  constructor() { }

  ngOnInit() {
  }

}
