import { TestBed } from '@angular/core/testing';

import { CircuitService } from './circuits.service';

describe('CircuitService', () => {
  let service: CircuitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CircuitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
