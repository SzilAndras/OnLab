import {Component, OnInit} from '@angular/core';
import {ReservationHttpService} from '../../../shared/services/http/reservation-http.service';
import {ReservationInterface} from '../../../shared/model/interfaces/reservation.interface';
import {UserInterface} from '../../../shared/model/interfaces/user.interface';
import {UserHttpService} from '../../../shared/services/http/user-http.service';
import {AppointmentInterface} from '../../../shared/model/interfaces/appointment.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {DatepickerOptions} from 'ng2-datepicker';
import {Status} from '../../../shared/model/enums/status.enum';
import {DatePipe} from '@angular/common';
import {AppointmentType} from '../../../shared/model/enums/appointment-type.enum';
import {AppointmentState} from '../../../shared/model/enums/appointment-state.enum';

@Component({
  selector: 'app-admin-reservation-edit',
  templateUrl: './admin-reservation-edit.component.html',
  styleUrls: ['./admin-reservation-edit.component.css']
})
export class AdminReservationEditComponent implements OnInit {
  resId: number;
  reservation: ReservationInterface;
  user: UserInterface;

  handover: AppointmentInterface;
  handoverDate = new Date();

  takeover: AppointmentInterface;
  takeoverDate = new Date();

  duringWork: AppointmentInterface[] = [];
  workDate = new Date();

  isEdited: {handover: boolean, takeover: boolean, works: boolean};
  options: DatepickerOptions = {
    minYear: new Date(Date.now()).getFullYear(),
    maxYear: new Date(Date.now() + (86400000 * 14)).getFullYear(),
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'ddd',
    firstCalendarDay: 1, // 0 - Sunday, 1 - Monday
    minDate: new Date(Date.now()), // Minimal selectable date
    maxDate: new Date(Date.now() + (86400000 * 14)),  // Maximal selectable date
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: true, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown
  };

  constructor(
    private resHttpService: ReservationHttpService,
    private userService: UserHttpService,
    private router: Router,
    private route: ActivatedRoute,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.isEdited = {handover: false, takeover: false, works: false};
    this.resId = +this.route.snapshot.paramMap.get('id');
    this.resHttpService.getReservationById(this.resId).subscribe(
      (response) => {
        this.reservation = response;
        for (const app of this.reservation.appointments) {
          if (app.type === 'Takeover') {
            this.takeoverDate = new Date(app.day);
            if (app.state === AppointmentState.Accepted) {
              this.takeover = app;
            }
          } else if (app.type === AppointmentType.Handover ) {
            this.handoverDate = new Date(app.day);
          } else if (app.type === AppointmentType.Work) {
            this.workDate = new Date(app.day);
            this.duringWork.push(app);
          }
        }
        this.userService.getUser(this.reservation.userId + '').subscribe(
          (user) => {
            this.user = user;
          }
        );
    });
  }

  valuesSum(): {timeSum: number, priceSum: number} {
    const values = {timeSum: 0, priceSum: 0};
    for (const work of this.reservation.works) {
      values.timeSum += +work.time;
      values.priceSum += +work.price;
    }
    return values;
  }

  isFull() {
    const current = this.duringWork.length * 30;
    console.log(current);
    console.log(this.valuesSum().timeSum);
    return current <= this.valuesSum().timeSum;
  }

  onHandoverSelected(appointment: AppointmentInterface[]) {
    if (this.largerAppointment(this.getLastWorkDateAppointment(), appointment[0]).type !== appointment[0].type){
      this.handoverDate = new Date(this.getLastWorkDateAppointment().day);
    } else {
      console.log('else');
      this.handover = appointment[0];
    }
  }

  onTakeoverSelected(appointment: AppointmentInterface[]) {
    this.takeover = appointment[0];
    if (this.duringWork.length !== 0) {
      if (this.largerAppointment(this.takeover, this.getFirsWorkDateAppointment()) === this.takeover ){
        this.workDate = this.takeoverDate;
        this.duringWork = [];
      }
    } else {
      this.workDate = this.takeoverDate;
    }
  }

  onChangeWorkDate(): void {
    console.log('onChangeWorkDate');
    console.log(this.workDate);
  }

  onChangeHandoverDate(): void {
    console.log('onChangeHandoverDate');
    console.log(this.handoverDate);
  }

  onDuringWorkSelected(appointment: AppointmentInterface[]) {
    if (this.isDuringWorkIncludes(appointment[0])) {
      this.duringWork.splice(this.indexInDuringWork(appointment[0]), 1);
    } else if (this.isFull()) {
      this.duringWork.push(appointment[0]);
      if(this.largerAppointment(appointment[0], this.takeover).type === appointment[0].type){
        if (!(this.handoverDate !== undefined) || !(this.handover !== undefined)){
          this.handoverDate = new Date(this.getLastWorkDateAppointment().day);
        } else if (this.largerAppointment(this.handover, appointment[0]).type !== this.handover.type){
          this.handoverDate = new Date(this.getLastWorkDateAppointment().day);
          this.handover = undefined;
        }
      }
    }
  }

  onSave() {
    if (this.duringWork.length > 0 && this.handoverDate !== undefined && this.takeover !== undefined) {
      if (this.reservation.userStatus === 'Accepted' && this.reservation.adminStatus === 'Pending') {
        if (this.handover === undefined) {
          this.resHttpService.confirmReservation(this.reservation).subscribe(
            (response) => {
            }
          );
        } else {
          console.log('suggest new');
          this.reservation.appointments.push(this.handover);
          this.resHttpService.suggestReservation(this.reservation).subscribe(
            (response) => {
            }
          );
        }

      } else {
      for (const w of this.duringWork) {
        this.reservation.appointments.push(w);
      }
      this.reservation.appointments.push(this.handover);
      this.reservation.appointments.push(this.takeover);
      this.reservation.adminStatus = Status.Accepted;

      this.resHttpService.confirmReservation(this.reservation).subscribe(
        (response) => {
          this.router.navigate(['admin-reservations/list']);
        }, (error) => {
          console.log(error);
        }
      );
      }
    } else {
      console.log('Validation fails.');
    }
  }

  onReject() {
    this.reservation.adminStatus = Status.Rejected;
    this.resHttpService.rejectReservation(this.reservation).subscribe(
      (response) => {
      }, (error) => {
        console.log(error);
      }
    );
  }

  isDuringWorkIncludes(appointment: AppointmentInterface) {
    if (this.duringWork.length > 0) {
      for (const a of this.duringWork) {
        if (a.day.toString() === appointment.day.toString() && a.time === appointment.time && a.type === appointment.type) {
          return true;
        }
      }
    }
    return ;
  }

  indexInDuringWork(appointment: AppointmentInterface) {
    if (this.duringWork.length > 0) {
      for (const a of this.duringWork) {
        if (a.day.toString() === appointment.day.toString() && a.time === appointment.time && a.type === appointment.type) {
          return this.duringWork.indexOf(a);
        }
      }
    }
    return -1;
  }

  onBack() {
    this.router.navigate(['admin-reservations/list']);
  }

  isAcceptedByAdmin(): boolean {
    return this.reservation.adminStatus.toString() === 'Accepted';
  }

  isAcceptedByUser(): boolean {
    return this.reservation.userStatus.toString() === 'Accepted';
  }

  isRejected(): boolean {
    return (this.reservation.userStatus === Status.Rejected || this.reservation.adminStatus === Status.Rejected);
  }

  getLastWorkDateAppointment() {
    let tempAppointment: AppointmentInterface;
    if (this.duringWork.length > 0) {
      tempAppointment = this.duringWork[0];
      for (const workDate of this.duringWork) {
        const strDate = workDate.day;
        if (tempAppointment.day !== strDate) {
          tempAppointment = this.largerDateStr(tempAppointment.day, strDate) === tempAppointment.day ? tempAppointment : workDate;
        } else {
          const temp = tempAppointment.day.split(':');
          const temp2 = workDate.day.split(':');
          tempAppointment = +temp[0] < +temp2[0] ? workDate :
            +temp[0] === +temp2[0] && +temp[1] < +temp2[1] ? workDate : tempAppointment;
        }
      }
    }
    return tempAppointment;
  }

  getFirsWorkDateAppointment() {
    let tempAppointment: AppointmentInterface;
    if (this.duringWork.length > 0) {
      tempAppointment = this.duringWork[0];
      for (const workDate of this.duringWork) {
        const strDate = workDate.day;
        if (tempAppointment.day !== strDate) {
          tempAppointment = this.largerDateStr(tempAppointment.day, strDate) === tempAppointment.day ? workDate : tempAppointment ;
        } else {
          const temp = tempAppointment.day.split(':');
          const temp2 = workDate.day.split(':');
          tempAppointment = +temp[0] > +temp2[0] ? workDate :
            +temp[0] === +temp2[0] && +temp[1] > +temp2[1] ? workDate : tempAppointment;
        }
      }
    }
    return tempAppointment;
  }

  largerAppointment(app1: AppointmentInterface, app2: AppointmentInterface) {
    let tempApp: AppointmentInterface;
    if (app1.day !== (app2.day)) {
      tempApp = this.largerDateStr(app1.day, app2.day) === app1.day ? app1 : app2;
    } else {
      const temp = app1.time.split(':');
      const temp2 = app2.time.split(':');
      tempApp = +temp[0] < +temp2[0] ? app2 :
        +temp[0] === +temp2[0] && +temp[1] < +temp2[1] ? app2 : app1;
    }
    return tempApp;
  }

  largerDateStr(d1: string, d2: string) {
    const temp1: string[] = d1.split('-');
    const temp2: string[] = d2.split('-');
    if (+temp1[0] < +temp2[0]) {
      return d2;
    } else if (+temp1[0] === +temp2[0]) {
      if (+temp1[1] < +temp2[1]) {
        return d2;
      } else if (+temp1[1] === +temp2[1]) {
        if (+temp1[2] < +temp2[2]) {
          return d2;
        } else {
          return d1;
        }
      }
    }
    return d1;
  }



  init() {

  }
}
