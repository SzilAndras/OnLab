import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActualReservationsService {

  elementSelected = new EventEmitter<number>();

  constructor() { }
}
