import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatepickerOptions} from 'ng2-datepicker';
import {NewReservationService} from '../../../shared/services/new-reservation.service';
import {CellStatus} from '../../../shared/model/enums/cell-status.enum';
import {DatePipe} from '@angular/common';
import {AppointmentType} from '../../../shared/model/enums/appointment-type.enum';
import {AppointmentState} from '../../../shared/model/enums/appointment-state.enum';
import {AppointmentInterface} from '../../../shared/model/interfaces/appointment.interface';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit{
  date: Date;
  comment: string;
  selectedTakeovers: AppointmentInterface[];
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
    private router: Router,
    private resService: NewReservationService,
    private datepipe: DatePipe
    ) { }

  ngOnInit() {
    this.selectedTakeovers = this.resService.reservation.appointments;
    if(this.resService.reservation.comments[0] !== undefined){
      this.comment = this.resService.reservation.comments[0].comment;
    } else {
      this.comment = '';
    }

    this.date = new Date();
  }

  onNext() {
    this.resService.reservation.appointments = this.selectedTakeovers;
    this.resService.reservation.comments = [{comment: this.comment, commentNumber: 0}];
    this.router.navigate(['new-reservation/overview']);
  }

  onTakeoverSelected(appointments: AppointmentInterface[]){
    this.selectedTakeovers = appointments;
  }


  isValid(){
    this.resService.isAppointmentValid();
  }

  onBack(){
    this.router.navigate(['new-reservation/vehicle']);
  }

}
