import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, RouterLink, RouterOutlet } from '@angular/router';
import { Application } from '../application.model';
import { DbService } from '../db-service';
import { IApplication } from '../entities/Application';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.css']
})
export class AdviceComponent implements OnInit {
  advice!: string;
  applicationID:number = 0;
  applicationToShow!: IApplication;

  constructor(private DB:DbService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.applicationID = this.route.snapshot.params['id'];
    this.DB.getApplication(this.applicationID).subscribe(app => {
      this.applicationToShow = app;
    });
    }

  postAdvice(advice:string) {
    this.applicationToShow.advice = advice;
    //TODO Status updaten naar iets anders 
    this.applicationToShow.status = "Besluit"
    this.DB.updateApplication(this.applicationID,this.applicationToShow)
      .subscribe(() => this.goBack());
  }

  goBack(){
    this.router.navigate(['overview']);
  }
}
