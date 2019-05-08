import { Injectable } from '@angular/core';
import {RatingInterface} from '../../model/interfaces/rating.interface';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RatingHttpService {
  url = 'http://localhost:3000/rating/';

  constructor(private httpClient: HttpClient) { }

  newRating(rating: RatingInterface) {
    return this.httpClient.post(this.url + 'save', rating);
  }

  getAllRating(){
    return this.httpClient.get<RatingInterface[]>(this.url + 'findAll');
  }
}
