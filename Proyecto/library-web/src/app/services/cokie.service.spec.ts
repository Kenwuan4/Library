import { TestBed } from '@angular/core/testing';

import { CokieService } from './cokie.service';

describe('CokieService', () => {
  let service: CokieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CokieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
