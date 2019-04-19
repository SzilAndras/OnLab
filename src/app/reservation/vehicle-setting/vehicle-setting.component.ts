import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NewReservationService} from '../../services/new-reservation.service';
import {Work} from '../../Models/interfaces/work';
import {Status} from '../../Models/enums/status.enum';

@Component({
  selector: 'app-vehicle-setting',
  templateUrl: './vehicle-setting.component.html',
  styleUrls: ['./vehicle-setting.component.css']
})
export class VehicleSettingComponent implements OnInit {
  vehicleType: string;

  plateNumber: string;

  vin: string;

  works: Work[];

  newWork: string;

  constructor(
    private router: Router,
    public resService: NewReservationService) { }

  ngOnInit() {
    console.log(this.resService.reservation);
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
    console.log(this.works);
    if(this.works === undefined){
      this.works = [];
    }
    if(this.newWork.length > 2){
      this.works.push({id: undefined, work: this.newWork, time: 0, price: 0, state: Status.Pending});
      this.newWork = '';
    }
    console.log(this.works);
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
