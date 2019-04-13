import {Status} from '../enums/status.enum';

export interface Work {
  id: number;
  work: string;
  time: number; // min
  price: number;
  state: Status;
}

