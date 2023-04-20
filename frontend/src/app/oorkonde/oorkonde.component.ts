import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from '../db-service';
import { IApplication } from '../entities/Application';

@Component({
  selector: 'app-oorkonde',
  templateUrl: './oorkonde.component.html',
  styleUrls: ['./oorkonde.component.css']
})
export class OorkondeComponent implements OnInit {

  oorkonde!: string;
  applicationID:number = 0;
  applicationToShow!: IApplication;

  constructor(private DB:DbService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    //this.applicationToShow = this.DB.getApplication(this.applicationID);
    this.applicationID = +this.route.snapshot.paramMap.get('id')!;
    this.DB.getApplication(this.applicationID).subscribe(application => {
      this.applicationToShow = application;
    });
  }

  putOorkonde(oorkonde:string) {
    //TODO Updaten naar juiste veld wanneer dat in de database bestaat
    this.applicationToShow.certificate = oorkonde;
    //TODO Status updaten naar iets anders
    this.applicationToShow.status = "klaar"
    this.DB.updateApplication(this.applicationToShow.id!,this.applicationToShow)
      .subscribe(() => this.goBack());
  }

  goBack(){
    this.router.navigate(['overview']);
  }

}
