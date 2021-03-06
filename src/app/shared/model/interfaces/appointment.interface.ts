import {AppointmentState} from '../enums/appointment-state.enum';
import {AppointmentType} from '../enums/appointment-type.enum';

export interface AppointmentInterface {
  id: number;
  day: string;
  time: string;
  state: AppointmentState;
  type: AppointmentType;
}



