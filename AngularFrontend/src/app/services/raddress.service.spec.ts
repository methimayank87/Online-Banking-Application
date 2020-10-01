import { TestBed } from '@angular/core/testing';

import { RaddressService } from './raddress.service';

describe('RaddressService', () => {
  let service: RaddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
