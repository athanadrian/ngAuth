import { AuthGuard } from './auth-guard.service';
import { Injectable, state } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AdminAuthGuard extends AuthGuard {

  //constructor( route: any, state: RouterStateSnapshot) { }
  canActivate(route: any, state: RouterStateSnapshot) {
    
    let isAuthenticated = super.canActivate(route, state);
    let user=this.authService.currentUser;
    if (!isAuthenticated){
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    if (user && user.admin)
      return true;

    this.router.navigate(['/no-access']);
    return false;
  }
}
