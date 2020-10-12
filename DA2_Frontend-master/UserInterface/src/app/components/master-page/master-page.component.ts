import { Component, OnInit } from '@angular/core';
import { MasterPageService } from '../../services/master-page.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from 'src/app/intefaces/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent implements OnInit {

  LoggedUser: User;
  errorMessage: string;
  constructor(private masterpageService: MasterPageService, private cookieService: CookieService, private routerService: Router) { }

  ngOnInit() {
    this.getUserFromSession();
  }

  getUserFromSession() {
    this.masterpageService.getUserFromSession().subscribe(
      ((data: any) => this.result(data)),
      ((error: any) => this.getErrorMessage(error))
    )
  }

  result(userToBeSeted: User) {
    this.LoggedUser = userToBeSeted;
    if (this.LoggedUser.isAdmin) {
      this.cookieService.set(environment.IDRole, environment.Admin);
    } else {
      this.cookieService.set(environment.IDRole, environment.Writter);
    }
  }
  
  getErrorMessage(error: string) {
    this.errorMessage = error;
  }

  logOut() {
    this.cookieService.delete(environment.IDToken);
    this.cookieService.delete(environment.IDRole);
    this.routerService.navigate(['/login']);
  }

}
