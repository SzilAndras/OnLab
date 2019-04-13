import {Appointment} from './appointment';
import {Work} from './work';
import {Comment} from './comment';
import {Status} from '../enums/status.enum';


export interface Reservation {
  id: number;

  userId: number;

  vehicleType: string;

  plateNumber: string;

  vin: string;

  works: Work[];

  appointments: Appointment[];

  comments: Comment[];

  state: Status;


}
