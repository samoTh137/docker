import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { IApplication } from '../entities/Application';
import { ICareer } from '../entities/Career';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {  
  private apiUrl = 'http://projectvm8.p.bletchley.cloud:10056/application';

  constructor(private http: HttpClient) { }

getAanvragen(): Observable<IApplication[]> {
  return this.http.get<IApplication[]>(this.apiUrl);
}
postAanvragen(newApplication: IApplication): Observable<IApplication> {
  console.log(newApplication);
  return this.http.post<IApplication>(this.apiUrl, newApplication)
  .pipe(
    catchError((err) => {
      console.log('error caught in service')
      console.error(err);
      return throwError(err);    
    })

  )}
  postLoopBaan(newCareer: ICareer): Observable<ICareer> {
    console.log(newCareer);
    return this.http.post<ICareer>(this.apiUrl + "/career", newCareer)
    .pipe(
      catchError((err) => {
        console.log('error caught in service')
        console.error(err);
        return throwError(err); 
      })
  
    )}
}