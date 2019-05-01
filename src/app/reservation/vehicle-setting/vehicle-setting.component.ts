import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NewReservationService} from '../../services/new-reservation.service';
import {Work} from '../../Models/interfaces/work';
import {Status} from '../../Models/enums/status.enum';
import {Reservation} from '../../Models/interfaces/reservation';

@Component({
  selector: 'app-vehicle-setting',
  templateUrl: './vehicle-setting.component.html',
  styleUrls: ['./vehicle-setting.component.css']
})
export class VehicleSettingComponent implements OnInit {
  reservation: Reservation;

  /*vehicleType: string;

  plateNumber: string;

  vin: string;

  works: Work[];*/

  newWork: string;

  constructor(
    private router: Router,
    public resService: NewReservationService) { }

  ngOnInit() {
    console.log(this.resService.reservation);
    this.reservation = this.resService.reservation;
  }

  onNext() {
    this.router.navigate(['reservation/appointment']);
  }

  onNewWork(){
    console.log(this.reservation.works);
    if(this.reservation.works === undefined){
      this.reservation.works = [];
    }
    if(this.newWork.length > 2){
      this.reservation.works.push({id: undefined, work: this.newWork, time: 0, price: 0, state: Status.Pending});
      this.newWork = '';
    }
    console.log(this.reservation.works);
  }

  onRemoveWork(idx: number){
    this.reservation.works.splice(idx, 1);
  }

}
