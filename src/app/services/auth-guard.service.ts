import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private service: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.service.loggedInUserId) {
      return true;
    }

    this.router.navigate(['/welcome']);
    return false;
  }
}