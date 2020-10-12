import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Components } from '../intefaces/Components';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TextFileService {
  loggedUserToken: string;
  httpOptions: any;
  headers: HttpHeaders;

  constructor(private httpService: HttpClient, private cookieService: CookieService) { }

  getTextFiles(owner_ID: number, textFileName:string, sortConditions:Array<string>, orderby:string):Observable<Array<Components>> {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    let params = new HttpParams();
    params = params.append('owner_ID', owner_ID.toString());
    params = params.append('name', textFileName);
    params = params.append('sort_by', sortConditions.toString());
    params = params.append('order_by', orderby.toString());
    
    const options = { headers: headers, params: params};
    
    return this.httpService.get<Array<Components>>(environment.apiTextFiles, options)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteTextFile(TextFileID: number) {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.delete(environment.apiTextFiles + '/' + TextFileID, options)
      .pipe(
        catchError(this.handleError)
      )
  }

  creatTextFile(TextFileToBeInserted: Components): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.post(environment.apiTextFiles, JSON.stringify(TextFileToBeInserted), options)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateTextFile(TextFileID: number, TextFile: Components) {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.put(environment.apiTextFiles + '/' + TextFileID, JSON.stringify(TextFile), options)
      .pipe(
        catchError(this.handleError)
      )
  }

  getTextFile(TextFileID: number): Observable<Components> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get(environment.IDToken)
      }
      )
    }
    return this.httpService.get<Components>(environment.apiTextFiles + '/' + TextFileID, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error) {
    return throwError(error.error || error.message);
  }


}
