import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { BasicAuthenticationService } from '../authentication/basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuardService implements CanActivate {

  constructor(
    private authenticationService: BasicAuthenticationService,
    private router: Router
  ) { }

 
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    }
    if (route.url.length > 0) {
      this.router.navigate(['/']);
    }
    return false;
  }
}
