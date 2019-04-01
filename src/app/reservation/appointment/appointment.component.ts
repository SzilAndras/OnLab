import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DatepickerOptions} from 'ng2-datepicker';
import {ReservationService} from '../../services/reservation.service';
import {CellStatus} from '../../Models/cell-status.enum';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  timeTable: Array<CellStatus>;

  date: Date;
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
    private resService: ReservationService
    ) { }

  ngOnInit() {
    this.timeTable = this.resService.timeTable;
    this.timeTable[4] = CellStatus.Reserved;
    console.log(this.timeTable);
    this.date = new Date();
    if(this.resService.reservation.appointment.day !== null){
      this.date = this.resService.reservation.appointment.day;
    }

  }

  onNext() {
    this.resService.reservation.appointment.day = this.date;
    this.router.navigate(['reservation/overview']);
  }

  onCellSelected(idx: number){
    if(this.timeTable[idx] !== CellStatus.Reserved){
      if(this.timeTable[idx] === CellStatus.Selected){
        this.timeTable[idx] = CellStatus.Empty;
      } else {
        this.timeTable[idx] = CellStatus.Selected;
      }
    }
  }

}
