import { Injectable } from '@angular/core';
import { User } from '../intefaces/User';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private httpService: HttpClient, private cookieService: CookieService) { }


  getFriends(): Observable<Array<User>> {
    let headers = new HttpHeaders({
      'Authorization': this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    return this.httpService.get<Array<User>>(environment.apiFriends, { headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteFriend(userID: number) {
    let headers = new HttpHeaders({
      'Authorization': this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.delete(environment.apiFriends + '/' + userID, options)
      .pipe(
        catchError(this.handleError)
      )
  }

  addFriend(friendID: number) {
    let headers = new HttpHeaders({
      'Authorization': this.cookieService.get(environment.IDToken)
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.post(environment.apiFriends + '/' + friendID, '', options)
      .pipe(
        catchError(this.handleError)
      )
  }

  shareComponent(componentID: number, userID: number) {
    let headers = new HttpHeaders({
      'Authorization': this.cookieService.get(environment.IDToken)
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.post(environment.apiFriends + '/' + userID + '/share/' + componentID, '', options)
      .pipe(
        catchError(this.handleError)
      )
  }

  unShareComponent(componentID: number, userID: number) {
    let headers = new HttpHeaders({
      'Authorization': this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.delete(environment.apiFriends + '/' + userID + '/share/' + componentID, options)
      .pipe(
        catchError(this.handleError)
      )
  }


  handleError(error) {
    console.log(error);
    return throwError(error.error || error.message);
  }
}
