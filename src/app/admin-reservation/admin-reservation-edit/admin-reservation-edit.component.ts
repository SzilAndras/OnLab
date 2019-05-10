import {Component, OnInit} from '@angular/core';
import {ReservationHttpService} from '../../services/http/reservation-http.service';
import {ReservationInterface} from '../../model/interfaces/reservation.interface';
import {UserInterface} from '../../model/interfaces/user.interface';
import {UserHttpService} from '../../services/http/user-http.service';
import {AppointmentInterface} from '../../model/interfaces/appointment.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {DatepickerOptions} from 'ng2-datepicker';
import {Status} from '../../model/enums/status.enum';
import {DatePipe} from '@angular/common';
import {AppointmentType} from '../../model/enums/appointment-type.enum';
import {AppointmentState} from '../../model/enums/appointment-state.enum';

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
  duringWork = new Array<AppointmentInterface>();
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
            if(app.state === AppointmentState.Accepted){
              this.takeover = app;
            }
            console.log('takeover date: ' + this.takeoverDate);
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

  valuesSum(): {timeSum: number, priceSum: number}{
    const values = {timeSum: 0, priceSum: 0};
    for (const work of this.reservation.works) {
      values.timeSum += +work.time;
      values.priceSum += +work.price;
    }
    return values;
  }

  onHandoverSelected(appointment: AppointmentInterface[]){
    this.handover = appointment[0];
    console.log(this.handoverDate);
    console.log(this.handover);
  }

  onTakeoverSelected(appointment: AppointmentInterface[]){
    this.takeover = appointment[0];
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
    console.log(this.duringWork);
    if (this.isDuringWorkIncludes(appointment[0])) {
      this.duringWork.splice(this.indexInDuringWork(appointment[0]), 1);
    } else {
      this.duringWork.push(appointment[0]);
    }
  }

  onSave() {
    if (this.duringWork.length > 0 && this.handoverDate !== undefined && this.takeover !== undefined) {
      if (this.reservation.userStatus === 'Accepted' && this.reservation.adminStatus === 'Pending') {
        if (this.handover === undefined) {
          console.log('confirm suggested by user');
          this.resHttpService.confirmReservation(this.reservation).subscribe(
            (response) => {
              console.log(response);
            }
          );
        } else {
          console.log('suggest new');
          this.reservation.appointments.push(this.handover);
          this.resHttpService.suggestReservation(this.reservation).subscribe(
            (response) => {
              console.log(response);
            }
          );
        }

      } else {
      for(let w of this.duringWork){
        this.reservation.appointments.push(w);
      }
      this.reservation.appointments.push(this.handover);
      this.reservation.appointments.push(this.takeover);
      this.reservation.adminStatus = Status.Accepted;
      console.log(this.reservation);

      this.resHttpService.confirmReservation(this.reservation).subscribe(
        (response) => {
          console.log(response);
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
        console.log(response);
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

  onBack(){
    this.router.navigate(['admin-reservations/list']);
  }

  isAcceptedByAdmin(): boolean{
    return this.reservation.adminStatus.toString() === 'Accepted';
  }

  isAcceptedByUser(): boolean{
    return this.reservation.userStatus.toString() === 'Accepted';
  }

  isRejected(): boolean {
    return (this.reservation.userStatus === Status.Rejected || this.reservation.adminStatus === Status.Rejected);
  }

  init(){

  }
}
