import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../db-service';
import { IApplication } from '../entities/Application';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

  decision!: string;
  translation!: string;
  applicationID:number = 0;
  applicationToShow!: IApplication;

  constructor(private DB:DbService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.applicationID = this.route.snapshot.params['id'];
    this.DB.getApplication(this.applicationID).subscribe(app => {
      this.applicationToShow = app;
    });
    }

  postTranslatedDecision(decision_translated:string) {
    this.applicationToShow.decisionTranslated = decision_translated;
    this.applicationToShow.status = "Oorkonde opmaken"
    this.DB.updateApplication(this.applicationID,this.applicationToShow)
      .subscribe(() => this.goBack());
  }

  goBack(){
    this.router.navigate(['overview']);
  }

}

