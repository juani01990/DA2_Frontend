import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ReportResult } from '../intefaces/ReportResult';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpService: HttpClient, private cookieService: CookieService) { }

  getTop10UserMoreFiles(): Observable<Array<ReportResult>> {
    let headers = new HttpHeaders({
      'Authorization': this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = {headers};
    return this.httpService.get<Array<ReportResult>>(environment.apiReports + '/Top10FilesPerUser',  options)
      .pipe(
        catchError(this.handleError)
      )
  }

  getModificationsOverFilesByUser(userID:number, fromDate:Date, toDate:Date): Observable<Array<ReportResult>> {
    let headers = new HttpHeaders({
      'Authorization': this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = {headers};
    return this.httpService.get<Array<ReportResult>>(environment.apiReports + '/modificationsbetweendates/'  + userID + '/' + fromDate + '/' + toDate, options)
      .pipe(
        catchError(this.handleError)
      )
  }

  getModificationsOverFolders(): Observable<Array<ReportResult>> {
    let headers = new HttpHeaders({
      'Authorization': this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = {headers};
    return this.httpService.get<Array<ReportResult>>(environment.apiReports + '/ModificationsOnFoldersPerUser', options)
      .pipe(
        catchError(this.handleError)
      )
  }


  handleError(error) {
    return throwError(error.error || error.message);
  }


}
