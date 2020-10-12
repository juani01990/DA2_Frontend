import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginUser } from 'src/app/intefaces/LoginUser';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/intefaces/User';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private _httpService: HttpClient, private cookieService: CookieService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  login(userToBeLogged: LoginUser): Observable<any> {
    return this._httpService.post(environment.apiSessions, JSON.stringify(userToBeLogged), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error) {
    return throwError(error.error || error.message);
  }

}


