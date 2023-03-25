import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { IAanvraag } from '../entities/Aanvraag';
import { ILoopBaan } from '../entities/LoopBaan';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {  
  private apiUrl = 'http://localhost:8080/aanvragen';

  constructor(private http: HttpClient) { }

getAanvragen(): Observable<IAanvraag[]> {
  return this.http.get<IAanvraag[]>(this.apiUrl);
}
postAanvragen(newAanvraag: IAanvraag): Observable<IAanvraag> {
  console.log(newAanvraag);
  return this.http.post<IAanvraag>(this.apiUrl, newAanvraag)
  .pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err);
      return throwError(err);    //Rethrow it back to component
    })

  )}
  postLoopBaan(newLoopBaan: ILoopBaan): Observable<ILoopBaan> {
    console.log(newLoopBaan);
    return this.http.post<ILoopBaan>(this.apiUrl + "/loopbaan", newLoopBaan)
    .pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err);    //Rethrow it back to component
      })
  
    )}
}