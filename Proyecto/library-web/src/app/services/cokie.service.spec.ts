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

  it('should return nothing', () => {
    expect(service.set("user", "test")).toBeNaN
  })

  it('should return nothing', () => {
    expect(service.delete("user")).toBeNaN
  })

  it('should return string from cookie', () => {
    expect(service.get("user")).not.toBeNull
  })
});
