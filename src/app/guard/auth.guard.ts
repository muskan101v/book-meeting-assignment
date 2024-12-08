import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authenticationService: ServiceService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const userDetails = this._authenticationService.userdetails;

    if (userDetails?.token) {
      return true;
    }

    this._authenticationService.logout();
    this._router.navigate(['/login']);
    return false;
  }
}
