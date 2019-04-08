import {Injectable} from '@angular/core';
import {Reservation} from '../Models/reservation';
import {HttpClient} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {UserService} from './user.service';
import {CellStatus} from '../Models/cell-status.enum';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _reservation: Reservation;
  private _timeTable: Array<{status: CellStatus, time: string}>;

  constructor(private http: HttpClient, private datepipe: DatePipe, private userService: UserService) {
    this.reservation = new Reservation(this.userService.userId);
    this.timeTable = [];
    this.reservation.comments = [];
    this.reservation.comments.push({comment: ''});
    for (let i = 0; i < 15; i++) {
      this.timeTable.push({status: CellStatus.Empty, time: ('' + (8 + (i) * 0.5 ))});
    }
  }



  get reservation(): Reservation {
    return this._reservation;
  }

  set reservation(value: Reservation) {
    this._reservation = value;
  }


  get timeTable(): Array<{status: CellStatus, time: string}> {
    return this._timeTable;
  }

  set timeTable(value: Array<{status: CellStatus, time: string}>) {
    this._timeTable = value;
  }

  getAll(): Object {
    return this.http.get('http://localhost:3000/reservation/findAll')
      .subscribe((response: Response) => {
        console.log(response);
      });
  }

  create(): void {

    let res = {
      reservationId: 0,
      userId: this.reservation.userID,
      vehicleType: this.reservation.vehicleType,
      plateNumber: this.reservation.plateNumber,
      vin: this.reservation.vin,
      works: this.reservation.works,
      appointments: this.reservation.appointments, /*this.datepipe.transform(this.reservation.appointments.day, 'yyyy-MM-dd'),*/
      comments: [{comment: this.reservation.comments[0].comment, commentNumber: 0}],
      state: 'Pending',
    };
    this.http.post('http://localhost:3000/reservation/save', res).subscribe();
    console.log(res);
    this.reservation = new Reservation(this.userService.userId);
    this.timeTable = [];
    for (let i = 0; i < 15; i++) {
      this.timeTable.push({status: CellStatus.Empty, time: ('' + (8 + (i) * 0.5 ))});
    }
    // TODO
  }

  async getDateAppointments(dateStr: string): Promise<Array<{day: string, time: string, state: string, type: string}>> {
    return await this.http.get<Array<{day: string, time: string, state: string, type: string}>>('http://localhost:3000/appointment/findAppointmentsByDate=' + dateStr).toPromise();
    // TODO
}

async refreshTimeTable(date: Date){
  this.timeTable = [];
  for (let i = 0; i < 15; i++) {
    this.timeTable.push({status: CellStatus.Empty, time: ('' + (8 + (i) * 0.5 ))});
  }
  const dateStr = this.datepipe.transform(date, 'yyyy-MM-dd');
    await this.getDateAppointments(dateStr).then(response => {
      const apps = response;
      console.log('response:');
      console.log(apps);
      for(let cell of this.timeTable){
        for(let app of apps){
          if(app.time === cell.time && (app.state === 'Accepted' || app.state === 'Suggested')){
            cell.status = CellStatus.Reserved;
            console.log(cell);
            console.log(app);
          }
        }
      }
    });
}


}
