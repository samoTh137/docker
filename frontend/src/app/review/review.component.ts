import { Component, OnDestroy, OnInit } from '@angular/core';
import { DbService } from '../db-service';
import { Subject } from 'rxjs';
import { Application } from '../application.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IApplication } from '../entities/Application'
import { ICareer } from '../entities/Career';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit, OnDestroy {
  applications: IApplication[] = [];
  applicationToShow: IApplication;
  applicationLoopbaan: ICareer;
  destroy$: Subject<boolean> = new Subject<boolean>();
  applicationID: number = 0;
  dataChecked: boolean;


  constructor(public dbService :DbService, private route:ActivatedRoute, private router:Router) { 
    this.dbService.getApplications().subscribe(data => this.applications = data);

  }

  acceptApplication(){
    this.applicationToShow.status = "Advies";
    this.dbService.updateApplication(this.applicationID,this.applicationToShow)
    .subscribe(() => this.goBack());
  }

  denyApplication(){
    this.applicationToShow.status = "Afgewezen";
    this.dbService.updateApplication(this.applicationID,this.applicationToShow)
    .subscribe(() => this.goBack());
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

    });

    }

    goBack(){
      this.router.navigate(['overview']);
    }
  }
