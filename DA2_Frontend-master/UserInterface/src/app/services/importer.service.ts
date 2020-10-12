import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Importer } from '../intefaces/Importer';

@Injectable({
  providedIn: 'root'
})
export class ImporterService {
  httpOptions: any;
  headers: HttpHeaders;

  constructor(private httpService: HttpClient, private cookieService: CookieService) { }


  getAvailableImporters(): Observable<Array<Importer>> {
    let headers = new HttpHeaders({
      'Authorization': this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    return this.httpService.get<Array<Importer>>(environment.apiImporter + '/available', { headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  importData(infoToImport:Importer): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': this.cookieService.get(environment.IDToken),
      'Content-Type': 'application/json'
    });
    const options = { headers: headers, responseType: 'text' as 'text' };
    return this.httpService.post(environment.apiImporter, JSON.stringify(infoToImport), options)
      .pipe(
        catchError(this.handleError)
      )
  }


  handleError(error) {
    return throwError(error.error || error.message);
  }




}
