import {FilterStatus} from '../enums/filter-status.enum';



export interface FilterInterface {
  status: FilterStatus;
  plateNumber: string;
  type: string;
}
