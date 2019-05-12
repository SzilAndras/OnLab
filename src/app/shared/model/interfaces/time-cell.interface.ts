import {CellStatus} from '../enums/cell-status.enum';
import {CellType} from '../enums/cell-type.enum';

export interface TimeCellInterface {
  status: CellStatus;
  type: CellType;
  time: string;
  isCurrent?: boolean;
}
