import { TestBed } from '@angular/core/testing';

import { ReservationHttpService } from './reservation-http.service';

describe('ReservationHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReservationHttpService = TestBed.get(ReservationHttpService);
    expect(service).toBeTruthy();
  });
});
