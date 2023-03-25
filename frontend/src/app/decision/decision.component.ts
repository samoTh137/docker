import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../db-service';
import { IAanvraag } from '../entities/Aanvraag';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.css']
})
export class DecisionComponent implements OnInit {

  decision!: string;
  applicationID:number = 0;
  applicationToShow!: IAanvraag;

  constructor(private DB:DbService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
  }

  postDecision(decision:string) {
    //TODO Updaten naar juiste veld wanneer dat in de database bestaat
    this.applicationToShow.verslagBetrokkene = decision;
    //TODO Status updaten naar iets anders 
    this.applicationToShow.status = "Besluit tekenen"
    this.DB.updateApplication(this.applicationToShow.id!,this.applicationToShow)
      .subscribe(() => this.goBack());
  }

  goBack(){
    this.router.navigate(['overview']);
  }

}
