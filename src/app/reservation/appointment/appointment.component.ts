import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatepickerOptions} from 'ng2-datepicker';
import {NewReservationService} from '../../services/new-reservation.service';
import {CellStatus} from '../../Models/enums/cell-status.enum';
import {DatePipe} from '@angular/common';
import {AppointmentType} from '../../Models/enums/appointment-type.enum';
import {AppointmentState} from '../../Models/enums/appointment-state.enum';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit{
  timeTable: Array<{status: CellStatus, time: string}>;
  date: Date;
  comment: string;
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
    this.timeTable = this.resService.timeTable;
    if(this.resService.reservation.comments[0] !== undefined){
      this.comment = this.resService.reservation.comments[0].comment;
    } else {
      this.comment = '';
    }

    console.log(this.timeTable);
    this.date = new Date();
  }

  onNext() {
    this.resService.timeTable = this.timeTable;
    for (let i = 0; i < this.timeTable.length; i++) {
      if (this.timeTable[i].status === CellStatus.Selected) {
        console.log(this.date);
        console.log(this.datepipe.transform(this.date, 'yyyy-MM-dd'));
        this.resService.reservation.appointments.push(
          {
            id: undefined,
            day: this.datepipe.transform(this.date, 'yyyy-MM-dd'),
            time: ('' + (8 + (i) * 0.5 )),
            type: AppointmentType.Takeover,
            state: AppointmentState.Selected
          }); /*this.datepipe.transform(this.date, 'yyyy-MM-dd')*/
      }
    }
    this.resService.reservation.comments.push({comment: this.comment, commentNumber: 0});
    this.router.navigate(['reservation/overview']);
  }

  onCellSelected(idx: number) {
    if (this.timeTable[idx].status !== CellStatus.Reserved){
      if (this.timeTable[idx].status === CellStatus.Selected){
        this.timeTable[idx].status = CellStatus.Empty;
      } else {
        this.timeTable[idx].status = CellStatus.Selected;
      }
    }
  }

  dateOnChange(): void {
    console.log('onChange');
    console.log(this.date);
    this.resService.refreshTimeTable(this.date);
    this.timeTable = this.resService.timeTable;
    console.log(this.date);

  }

}
