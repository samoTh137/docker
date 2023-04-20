import { Injectable} from '@angular/core';
import { Application } from './application.model';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IApplication } from './entities/Application';
import { ICareer } from './entities/Career';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  public applications: IApplication[] = [];

  getApplications() {
    return this.http.get<IApplication[]>("http://projectvm8.p.bletchley.cloud:10056/application").pipe(
      map((res: IApplication[]) => {
        return res;
      })
    );
  }

  getApplication(id:number){
    return this.http.get<IApplication>("http://projectvm8.p.bletchley.cloud:10056/application/"+ id);
  }

  updateApplication(id:number, application:IApplication){
    return this.http.put<IApplication>("http://projectvm8.p.bletchley.cloud:10056/application/"+id, application);
  }

  getApplicationLoopbaan(id:number){
    return this.http.get<ICareer>("http://projectvm8.p.bletchley.cloud:10056/application/career/" + id);
  }
}