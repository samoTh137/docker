import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DbService } from '../db-service';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { Application } from '../application.model';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})

export class OverviewComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>;

  constructor(public DB: DbService) { }

  public getAllApplications() {
    return this.DB.getApplications();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.getAllApplications().subscribe(data => {
      this.DB.applications = data;
    });
  }


}