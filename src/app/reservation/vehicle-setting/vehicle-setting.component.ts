import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {NewReservationService} from '../../services/new-reservation.service';
import {WorkInterface} from '../../model/interfaces/work.interface';
import {Status} from '../../model/enums/status.enum';
import {ReservationInterface} from '../../model/interfaces/reservation.interface';
import {FormControl, NgForm} from '@angular/forms';

@Component({
  selector: 'app-vehicle-setting',
  templateUrl: './vehicle-setting.component.html',
  styleUrls: ['./vehicle-setting.component.css']
})
export class VehicleSettingComponent implements OnInit {
/*
  @ViewChild('f') vehicleForm: NgForm;
*/

  reservation: ReservationInterface;

  /*vehicleType: string;

  plateNumber: string;

  vin: string;

  works: WorkInterface[];*/

  newWork = '';

  constructor(
    private router: Router,
    public resService: NewReservationService) { }

  ngOnInit() {
    console.log(this.resService.reservation);
    this.reservation = this.resService.reservation;
  }

  onNext() {
    console.log(this.reservation);
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

  /*isVehicleValid(){
    console.log(this.vehicleForm);
    console.log(this.vehicleForm.form.valid);
    return this.vehicleForm.valid;
  }*/

}
