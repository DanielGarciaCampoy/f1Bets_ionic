import { TestBed } from '@angular/core/testing';

import { ApuestasService } from './apuestas.service';

describe('ApuestasService', () => {
  let service: ApuestasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApuestasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
