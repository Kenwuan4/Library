import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouteGuardGuard } from './route-guard.guard';

describe('RouteGuardGuard', () => {
  let guard: RouteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[HttpClientTestingModule]});
    guard = TestBed.inject(RouteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
