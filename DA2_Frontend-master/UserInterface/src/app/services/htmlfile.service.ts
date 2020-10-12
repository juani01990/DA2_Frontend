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
export class HtmlFileService {
  loggedUserToken: string;
  httpOptions: any;
  headers: HttpHeaders;

  constructor(private httpService: HttpClient, private cookieService: CookieService) { }

  getHtmlFiles():Observable<Array<Components>> {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });   
    const options = { headers: headers};
   
    return this.httpService.get<Array<Components>>(environment.apiHTMLFiles + '/allhtmlfiles', options)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteHtmlFile(HtmlFileID: number) {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.delete(environment.apiHTMLFiles + '/' + HtmlFileID, options)
      .pipe(
        catchError(this.handleError)
      )
  }

  creatHtmlFile(HtmlFileToBeInserted: Components): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.post(environment.apiHTMLFiles, JSON.stringify(HtmlFileToBeInserted), options)
      .pipe(
        catchError(this.handleError)
      )
  }

  updateHtmlFile(HtmlFileID: number, HtmlFile: Components) {
    let headers = new HttpHeaders({
      'Authorization': this.loggedUserToken = this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.put(environment.apiHTMLFiles + '/' + HtmlFileID, JSON.stringify(HtmlFile), options)
      .pipe(
        catchError(this.handleError)
      )
  }

  getHtmlFile(HtmlFileID: number, viewRenderizedHTML: boolean): Observable<Components> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.cookieService.get(environment.IDToken)
      }
      )
    }
    let type:string;
    if (viewRenderizedHTML){
      type = "decoded";
    }else{
      type = "encoded";
    }
    return this.httpService.get<Components>(environment.apiHTMLFiles + '/' + HtmlFileID + '/' + type, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  handleError(error) {
    return throwError(error.error || error.message);
  }


}
