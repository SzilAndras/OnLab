import {Component, OnInit} from '@angular/core';
import {ActualReservationsService} from '../../services/actual-reservations.service';
import {ReservationInterface} from '../../model/interfaces/reservation.interface';
import {ReservationHttpService} from '../../services/http/reservation-http.service';
import {Status} from '../../model/enums/status.enum';
import {AppointmentInterface} from '../../model/interfaces/appointment.interface';
import {DatepickerOptions} from 'ng2-datepicker';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {
  id: number;
  reservation: ReservationInterface;
  handover: AppointmentInterface;
  handoverDate: Date;
  selectHandover = false;

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
    private readonly actualReservationService: ActualReservationsService,
    private readonly reservationHttpService: ReservationHttpService
  ) { }

  ngOnInit() {
    this.actualReservationService.elementSelected.subscribe(
      (resId: number) => {
        this.reservationHttpService.getReservationById(resId).subscribe((reservation) => {
          console.log(reservation);
          this.reservation = reservation;
          console.log(this.reservation);
        });
      }
    );
  }

  valuesSum(): {timeSum: number, priceSum: number}{
    const values = {timeSum: 0, priceSum: 0};
    for (const work of this.reservation.works) {
      if(work.state.toString() === 'Accepted'){
        console.log(Status.Accepted.toString());
        values.timeSum += +work.time;
        values.priceSum += +work.price;
      }
  }
    return values;
  }

  onHandoverSelected(appointment: AppointmentInterface[]){
    this.handover = appointment[0];
  }

  onChangeHandoverDate(): void {
    console.log('onChangeHandoverDate');
  }

  onAccept(){
    if(this.handover === undefined){
      this.reservation.userStatus = Status.Accepted;
      this.reservationHttpService.confirmReservation(this.reservation).subscribe(
        (response) => {
          this.reservation = response;
          this.actualReservationService.elementModified.emit(this.reservation.id);
        }
      );
    } else {
      this.reservation.appointments.push(this.handover);
      this.reservationHttpService.suggestReservation(this.reservation).subscribe(
        (response) => {
          this.reservation = response;
          this.actualReservationService.elementModified.emit(this.reservation.id);
        }
      );
    }
  }

  onReject(){
    this.reservationHttpService.rejectReservation(this.reservation).subscribe(
      (response) => {
        this.reservation = response;
        this.actualReservationService.elementModified.emit(this.reservation.id);
      }
    );
  }

  onCancelHandoverSelect() {
    this.handover = undefined;
    this.handoverDate = undefined;
    this.selectHandover = false;
  }

  isAcceptedByAdmin(){
    return this.reservation.adminStatus === Status.Accepted;
  }

  isAcceptedByUser() {
    return this.reservation.userStatus === Status.Accepted;
  }

  isRejected() {
    return (this.reservation.userStatus === Status.Rejected || this.reservation.adminStatus === Status.Rejected );
  }

}
