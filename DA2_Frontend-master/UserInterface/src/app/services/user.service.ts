import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Components } from '../intefaces/Components';
import { User } from '../intefaces/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedUserToken: string;
  httpOptions: any;
  headers: HttpHeaders;

  constructor(private httpService: HttpClient, private cookieService: CookieService) { }


  getUsers(): Observable<Array<User>> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get(environment.IDToken)
      }
      )
    }
    return this.httpService.get<Array<User>>(environment.apiUsers, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteUser(userID: number) {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.delete(environment.apiUsers + '/' + userID, options)
      .pipe(
        catchError(this.handleError)
      )
  }

  createUser(userToBeInserted: User): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.post(environment.apiUsers, JSON.stringify(userToBeInserted), options)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateUser(userID: number, user: User) {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.put(environment.apiUsers + '/' + userID, JSON.stringify(user), options)
      .pipe(
        catchError(this.handleError)
      )
  }
  getUser(userID: number): Observable<User> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get(environment.IDToken)
      }
      )
    }
    return this.httpService.get<User>(environment.apiUsers + '/' + userID, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  getAllComponents(): Observable<Components[]> {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    return this.httpService.get<Components[]>(environment.apiUsers + '/allcomponentsbyowner', { headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error) {
    return throwError(error.error || error.message);
  }

}
