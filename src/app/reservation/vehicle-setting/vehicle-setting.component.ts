import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ReservationService} from '../../services/reservation.service';

@Component({
  selector: 'app-vehicle-setting',
  templateUrl: './vehicle-setting.component.html',
  styleUrls: ['./vehicle-setting.component.css']
})
export class VehicleSettingComponent implements OnInit {
  vehicleType: string;

  plateNumber: string;

  vin: string;

  works: Array<{work: string, time: string, price: number}>;

  newWork: string;

  constructor(private router: Router, public resService: ReservationService) { }

  ngOnInit() {
    this.vehicleType = this.resService.reservation.vehicleType;
    this.plateNumber = this.resService.reservation.plateNumber;
    this.vin = this.resService.reservation.vin;
    this.works = this.resService.reservation.works;
  }

  onNext() {
    this.onSaveInf();
    this.router.navigate(['reservation/appointment']);
  }

  onNewWork(){
    if(this.newWork.length > 2){
      this.works.push({work: this.newWork, time: null, price: null});
      this.newWork = '';
    }
  }

  onSaveInf(){
    this.resService.reservation.vin = this.vin;
    this.resService.reservation.plateNumber = this.plateNumber;
    this.resService.reservation.vehicleType = this.vehicleType;
  }

  onRemoveWork(idx: number){
    this.works.splice(idx, 1);
  }

}
