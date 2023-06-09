import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../db-service';
import { IApplication } from '../entities/Application';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent implements OnInit {

  decision: string;
  applicationID:number = 0;
  applicationToShow!: IApplication;

  constructor(private DB:DbService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.applicationID = this.route.snapshot.params['id'];
    this.DB.getApplication(this.applicationID).subscribe(app => {
      this.applicationToShow = app;
    });
    }

  postDecision(decision:string) {
    this.applicationToShow.decision = decision;
    this.applicationToShow.status = "Besluit vertalen"
    this.DB.updateApplication(this.applicationID,this.applicationToShow)

      .subscribe(() => this.goBack());
  }

  goBack(){
    this.router.navigate(['overview']);
  }

}
