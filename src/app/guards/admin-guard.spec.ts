import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminGuard } from './admin-guard';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AdminGuard);
  });

  it('should allow activation if user is admin', () => {
    spyOn(localStorage, 'getItem').and.returnValue('admin');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should deny activation and navigate to login if user is not admin', () => {
    spyOn(localStorage, 'getItem').and.returnValue('user');
    expect(guard.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
