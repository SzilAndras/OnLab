
export class Reservation {
  private readonly _reservationId: number;

  private readonly _userID: number;

  private _vehicleType: string;

  private _plateNumber: string;

  private _vin: string;

  private _works: Array<{work: string, time: string, price: number}>;

  private _appointment: {day: Date, time: string[]};

  private _comments: Array<{authorId: number, content: string}>;

  private _state: string;

  private _suggestedAppointment: Array<{day: string, time: string}>;


  constructor(userID: number) {
    this._userID = userID;
    this._reservationId = 0;
    this._vehicleType = '';
    this._plateNumber = '';
    this._vin = '';
    this._works = [];
    this._appointment = {day: null, time: []};
    this._comments = [];
    this._state = '';
    this._suggestedAppointment = [];

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

  get works(): Array<{ work: string; time: string; price: number }> {
    return this._works;
  }

  set works(value: Array<{ work: string; time: string; price: number }>) {
    this._works = value;
  }

  get appointment(): { day: Date; time: string[] } {
    return this._appointment;
  }

  set appointment(value: { day: Date; time: string[] }) {
    this._appointment = value;
  }

  get comments(): Array<{ authorId: number; content: string }> {
    return this._comments;
  }

  set comments(value: Array<{ authorId: number; content: string }>) {
    this._comments = value;
  }

  get state(): string {
    return this._state;
  }

  set state(value: string) {
    this._state = value;
  }

  get suggestedAppointment(): Array<{ day: string; time: string }> {
    return this._suggestedAppointment;
  }

  set suggestedAppointment(value: Array<{ day: string; time: string }>) {
    this._suggestedAppointment = value;
  }
}
