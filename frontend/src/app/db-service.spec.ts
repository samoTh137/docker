import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'

import { DbService } from './db-service';
import { Application } from './application.model';
import { isEmpty } from 'rxjs';

describe('DbService', () => {
  let service: DbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[DbService],
      imports:[HttpClientModule]
    });
    service = TestBed.inject(DbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*it('#getApplications() should return value from a promise',() => {
    service.getApplications().subscribe((value: Application[]) => {
      expect ()
      done();
    });
  });*/
});
