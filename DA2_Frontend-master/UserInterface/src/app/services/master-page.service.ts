import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, tap } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/intefaces/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterPageService {
  LoggedUser: User;
  errorMessage: string;
  constructor(private _httpService: HttpClient, private cookieService: CookieService) {
  }

  isAuthenticated(): boolean {
    let loggedUserToken = (this.cookieService.get(environment.IDToken))
    return !(loggedUserToken == undefined || loggedUserToken == "");
  }

  isLoggedUserAdmin(): boolean {
    let loggedUserRole = (this.cookieService.get(environment.IDRole))
    return (loggedUserRole == environment.Admin);
  }
  
  getUserFromSession(): Observable<User> {
    let loggedUserToken = (this.cookieService.get(environment.IDToken))
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': loggedUserToken
      }
      )
    }
    return this._httpService.get<User>(environment.apiSessions + '/' + loggedUserToken, httpOptions)
      .pipe(
        tap(data => this.LoggedUser = data),
        catchError(this.handleError)
      )
  }

   

  handleError(error) {
    return throwError(error.error || error.message);
  }
}
