import {AppointmentInterface} from './appointment.interface';
import {WorkInterface} from './work.interface';
import {CommentInterface} from './comment.interface';
import {Status} from '../enums/status.enum';


export interface ReservationInterface {
  id?: number;

  userId?: number;

  vehicleType: string;

  plateNumber: string;

  vin: string;

  works: WorkInterface[];

  appointments: AppointmentInterface[];

  comments: CommentInterface[];

  adminStatus: Status;

  userStatus: Status;


}
