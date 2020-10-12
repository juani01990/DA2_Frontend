import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MasterPageService } from '../services/master-page.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private masterPageService: MasterPageService, public routerService: Router) { }

  canActivate(): boolean {
    if (!this.masterPageService.isAuthenticated()) {
      this.routerService.navigate(['forbidden']);
      return false;
    }
    return true;
  }
}
