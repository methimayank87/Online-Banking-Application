import { TestBed } from '@angular/core/testing';

import { Authentication1Guard } from './authentication1.guard';

describe('Authentication1Guard', () => {
  let guard: Authentication1Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Authentication1Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
