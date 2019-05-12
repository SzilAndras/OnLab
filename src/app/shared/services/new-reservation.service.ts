import {Injectable, OnInit} from '@angular/core';
import {ReservationInterface} from '../model/interfaces/reservation.interface';
import {DatePipe} from '@angular/common';
import {UserService} from './user.service';
import {CellStatus} from '../model/enums/cell-status.enum';
import {ReservationHttpService} from './http/reservation-http.service';
import {AppointmentState} from '../model/enums/appointment-state.enum';
import {Status} from '../model/enums/status.enum';
import {AppointmentHttpService} from './http/appointment-http.service';

@Injectable({
  providedIn: 'root'
})
export class NewReservationService implements OnInit{
  private _reservation: ReservationInterface;

  constructor(
    private datepipe: DatePipe,
    private userService: UserService,
    private reservationHttp: ReservationHttpService,
    private appointmentHttpService: AppointmentHttpService
    ) {
    this.reservation = {
      comments: [],
      appointments: [],
      works: [],
      plateNumber: '',
      vehicleType: '',
      adminStatus: Status.Pending,
      userStatus: Status.Pending,
      vin: '',
    };
  }

  ngOnInit(): void {
    this.reservation = {
      comments: [],
      appointments: [],
      works: [],
      plateNumber: '',
      vehicleType: '',
      adminStatus: Status.Pending,
      userStatus: Status.Pending,
      vin: '',
    };
  }



  get reservation(): ReservationInterface {
    return this._reservation;
  }

  set reservation(value: ReservationInterface) {
    this._reservation = value;
  }


  refreshReservation() {
    this.reservation = {
      comments: [],
      appointments: [],
      works: [],
      plateNumber: '',
      vehicleType: '',
      adminStatus: Status.Pending,
      userStatus: Status.Pending,
      vin: '',
    };
  }


  isVehicleSettingsValid(){
    return (this.reservation.vehicleType !== '' &&
            this.reservation.plateNumber !== '' &&
            this.reservation.vin !== '' &&
            this.reservation.works.length > 0);
  }

  isAppointmentValid() {
    return this.reservation.appointments.length > 0;
  }
}
