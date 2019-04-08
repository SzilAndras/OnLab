
export class Reservation {
  private readonly _reservationId: number;

  private readonly _userID: number;

  private _vehicleType: string;

  private _plateNumber: string;

  private _vin: string;

  private _works: Array<{work: string, time: number, price: number, state: string}>;

  private _appointments: Array<{day: string, time: string, state: string, type: string}>;

  private _comments: Array<{comment: string}>;

  private _state: string;


  constructor(userID: number) {
    this._userID = userID;
    this._reservationId = 0;
    this._vehicleType = '';
    this._plateNumber = '';
    this._vin = '';
    this._works = [];
    this._appointments = [];
    this._comments = [];
    this._state = 'Pending';

  }

  get reservationId(): number {
    return this._reservationId;
  }

  get userID(): number {
    return this._userID;
  }

  get vehicleType(): string {
    return this._vehicleType;
  }

  set vehicleType(value: string) {
    this._vehicleType = value;
  }

  get plateNumber(): string {
    return this._plateNumber;
  }

  set plateNumber(value: string) {
    this._plateNumber = value;
  }

  get vin(): string {
    return this._vin;
  }

  set vin(value: string) {
    this._vin = value;
  }

  get works(): Array<{work: string, time: number, price: number, state: string}> {
    return this._works;
  }

  set works(value: Array<{work: string, time: number, price: number, state: string}>) {
    this._works = value;
  }

  get appointments(): Array<{day: string, time: string, state: string, type: string}> {
    return this._appointments;
  }

  set appointments(value: Array<{day: string, time: string, state: string, type: string}>) {
    this._appointments = value;
  }

  get comments(): Array<{comment: string}> {
    return this._comments;
  }

  set comments(value: Array<{comment: string}>) {
    this._comments = value;
  }

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
  }

}
