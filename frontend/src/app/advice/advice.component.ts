import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, RouterLink, RouterOutlet } from '@angular/router';
import { Application } from '../application.model';
import { DbService } from '../db-service';
import { IAanvraag } from '../entities/Aanvraag';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['./advice.component.css']
})
export class AdviceComponent implements OnInit {
  advice!: string;
  applicationID:number = 0;
  applicationToShow!: IAanvraag;

  constructor(private DB:DbService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.applicationID = this.route.snapshot.params['id'];
    this.DB.getApplication(this.applicationID).subscribe(app => {
      this.applicationToShow = app;
    });
    }

  postAdvice(advice:string) {
    //TODO Updaten naar juiste veld wanneer dat in de database bestaat
    this.applicationToShow.verslagBetrokkene = advice;
    //TODO Status updaten naar iets anders 
    this.applicationToShow.status = "Besluit"
    this.DB.updateApplication(this.applicationToShow.id!,this.applicationToShow)
      .subscribe(() => this.goBack());
  }

  goBack(){
    this.router.navigate(['overview']);
  }
}
