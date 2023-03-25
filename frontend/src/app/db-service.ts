import { Injectable} from '@angular/core';
import { Application } from './application.model';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IAanvraag } from './entities/Aanvraag';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  public applications: IAanvraag[] = [];

  getApplications() {
    return this.http.get<IAanvraag[]>("http://localhost:8080/aanvragen").pipe(
      map((res: IAanvraag[]) => {
        return res;
      })
    );
  }

  getApplication(id:number){
    return this.http.get<IAanvraag>("http://localhost:8080/aanvragen/"+ id);
  }

  updateApplication(id:number, application:IAanvraag){
    return this.http.put<IAanvraag>("http://localhost:8080/aanvragen/"+id, application);
  }
}