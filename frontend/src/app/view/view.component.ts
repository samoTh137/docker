import { Component, OnDestroy, OnInit } from '@angular/core';
import { DbService } from '../db-service';
import { Subject } from 'rxjs';
import { Application } from '../application.model';
import { ActivatedRoute } from '@angular/router';
import { IApplication } from '../entities/Application';
import { ICareer } from '../entities/Career';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})

export class ViewComponent implements OnInit, OnDestroy {
  applications: IApplication[] = [];
  applicationToShow!: IApplication;
  applicationLoopbaan: ICareer;
  destroy$: Subject<boolean> = new Subject<boolean>();
  applicationID:number = 0;


  constructor(public dbService :DbService, private route:ActivatedRoute) { 
    this.dbService.getApplications().subscribe(data => this.applications = data);
    
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.applicationID = this.route.snapshot.params['id'];
    this.dbService.getApplication(this.applicationID).subscribe(data => {
      this.applicationToShow = data;
    });

    this.dbService.getApplicationLoopbaan(this.applicationID).subscribe(data => {
      this.applicationLoopbaan = data;
    })
    }
  }
