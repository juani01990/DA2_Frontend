import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MasterPageService } from '../services/master-page.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private masterPageService: MasterPageService, public routerService: Router) { }

  canActivate(): boolean {
    if (!this.masterPageService.isAuthenticated()) {
      this.routerService.navigate(['forbidden']);
      return false;
    }
    if(this.masterPageService.isAuthenticated() && !this.masterPageService.isLoggedUserAdmin()){
      this.routerService.navigate(['home']);
      return false;
    }
    return true;
  }
}
