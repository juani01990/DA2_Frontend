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
export class FolderService {
  loggedUserToken: string;
  httpOptions: any;
  headers: HttpHeaders;

  constructor(private httpService: HttpClient, private cookieService: CookieService) { }


  getFolders(): Observable<Array<Components>> {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    return this.httpService.get<Array<Components>>(environment.apiFolders + '/allfolders', { headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteFolder(folderID: number) {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.delete(environment.apiFolders + '/' + folderID, options)
      .pipe(
        catchError(this.handleError)
      )
  }

  creatFolder(folderToBeInserted: Components): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.post(environment.apiFolders, JSON.stringify(folderToBeInserted), options)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateFolder(folderID: number, folder: Components) {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.put(environment.apiFolders + '/' + folderID, JSON.stringify(folder), options)
      .pipe(
        catchError(this.handleError)
      )
  }

  getFolder(folderID: number): Observable<Components> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get(environment.IDToken)
      }
      )
    }
    return this.httpService.get<Components>(environment.apiFolders + '/' + folderID, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error) {
    return throwError(error.error || error.message);
  }


}
