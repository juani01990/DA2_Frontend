import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { Components } from '../intefaces/Components';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShareComponentService {

  constructor(private httpService: HttpClient, private cookieService: CookieService) { }

  getSharedComponents(): Observable<Array<Components>> {
    let headers = new HttpHeaders({
      'Authorization': this.cookieService.get(environment.IDToken)
    });
    const options = { headers: headers };
    return this.httpService.get<Array<Components>>(environment.apiSharedWith, options)
      .pipe(
        catchError(this.handleError)
      )
  }

  getSharedComponentsWith(friendID:number): Observable<Array<Components>> {
    let headers = new HttpHeaders({
      'Authorization': this.cookieService.get(environment.IDToken)
    });
    const options = { headers: headers };
    return this.httpService.get<Array<Components>>(environment.apiSharedWith + '/' + friendID, options)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error) {
    return throwError(error.error || error.message);
  }

}
