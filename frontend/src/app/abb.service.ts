import { Injectable} from '@angular/core';
import { Application } from './application.model';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IPerson } from './entities/Person';
import { IABBLoopBaan } from './entities/ABBLoopBaan';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ABBService {

  constructor(private http: HttpClient) { }

  getPersonByNationalNumber(nationalNumber: string): Observable<IPerson> {
    return this.http.get<IPerson>("http://projectvm27.p.bletchley.cloud:10079/citizen/${nationalNumber}").pipe(
      map((res: IPerson) => {
        return res;
      })
    );
  }

  getCareerByNationalNumber(nationalNumber: string): Observable<IABBLoopBaan> {
    return this.http.get<IABBLoopBaan>("http://projectvm27.p.bletchley.cloud:10079/employee/${nationalNumber}").pipe(
      map((res: IABBLoopBaan) => {
        return res;
      })
    );
  }
  
}
