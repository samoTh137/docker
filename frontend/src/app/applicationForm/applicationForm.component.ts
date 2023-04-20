import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { timeInterval, timeout } from 'rxjs';
import { ConfigService } from  '../config/config.service';
import { IApplication } from '../entities/Application';
import { ICareer } from '../entities/Career';
import { ActivatedRoute } from '@angular/router';
import { ABBService } from '../abb.service';
import { IABBLoopBaan, ILoopBaanItem } from '../entities/ABBLoopBaan';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-applicationForm',
  templateUrl: './applicationForm.component.html',
  styleUrls: ['./applicationForm.component.css']
})
export class ApplicationFormComponent implements OnInit {
  // variabele om loopbaan op te slaan
  loopBaanData: IABBLoopBaan | undefined;
  loopBaanItems: ILoopBaanItem[] | undefined;
  //

  newApplication = {} as IApplication;
  newCareer = {} as ICareer;
  currentPeriod : Date = new Date();

  firstname : string;
  lastname : string;
  birthplace: string;
  birthdate: Date;
  nationalnr: string;
  mainProfession : string;
  jobTitle: string;
  gradeOrRank: string;
  initiator : string;
  distinctionsReceived: string;
  serviceYears : number;
  resuEvaluation : string;
  sanctions : string;
  service : Date;
  proposedDistinction : string;
  reportInvolved :string;
  career : ICareer;
  salaryScale : string;
  grade: string[] = [];
  from: Date[]= [];
  to: Date[]= [];
  performanceBreach: number[]= [];
  naturePerformances: string[]= [];
  serviceMonths: number;
  status : string = "";
  savedId : number | undefined = -1;

@ViewChild("myPopup") private parentRef: ElementRef<HTMLElement>;
parentCompleted : HTMLElement;
@ViewChild("sendButton",{ static: true }) private sendButton: ElementRef;
public aanvragen: IApplication[];

  constructor(private aanvraagService: ConfigService, private router : Router, private route: ActivatedRoute, private ABBService: ABBService) {}

  ngOnInit(){
    setTimeout(() => {
      this.aanvraagService.getAanvragen().subscribe(a => this.aanvragen = a);

      // Rijksregisternummer ophalen uit URL
      this.nationalnr = this.route.snapshot.paramMap.get('rrn')!;
      //

      // Persoonsgegevens ophalen uit ABB API en in variabelen steken
      this.ABBService.getPersonByNationalNumber(this.nationalnr).subscribe(p => {
        this.firstname = p.voornaam!;
        this.lastname = p.achternaam!;
        this.birthplace = p.geboorteplaats!;
        this.birthdate = p.geboortedatum!;
      });
      //

      // Functie om loopbaan te halen aanroepen
      this.getCareerByNationalNumber(this.nationalnr);
      this.loopBaanItems = this.getCareerPath();
      for (let i = 0; i < this.loopBaanItems.length; i++) {
        this.grade[i] = this.loopBaanItems[i].grade;
        this.from[i] = this.loopBaanItems[i].fromDate!;
        this.to[i] = this.loopBaanItems[i].toDate!;
        this.performanceBreach[i] = this.loopBaanItems[i].performanceBreach;
        this.naturePerformances[i] = this.loopBaanItems[i].naturePerformances;
      }
      //
    }, 1000);


  };

// Loopbaan ophalen uit ABB API
public getCareerByNationalNumber(rrn: string) {
    this.ABBService.getCareerByNationalNumber(rrn).subscribe(
      (data: IABBLoopBaan) => {
        this.loopBaanData = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
//

// Loopbaanitems uit loopbaan halen
public getCareerPath(): ILoopBaanItem[] {
    if (this.loopBaanData && this.loopBaanData.loopbaan) {
      return this.loopBaanData.loopbaan;
    }
    return [];

    /*
    //write an example given ABB API is down
    const item1: ILoopBaanItem = {
      jobTitle: "Junior Developer",
      grade: "KS7",
      fromDate: new Date("2022-01-01"),
      toDate: new Date("2022-12-31"),
      performanceBreach: 1.0,
      naturePerformances: "Development"
    };

    const item2: ILoopBaanItem = {
      jobTitle: "Developer",
      grade: "A5C",
      fromDate: new Date("2023-01-01"),
      toDate: null,
      performanceBreach: 1.2,
      naturePerformances: "Development"
    };

    const item3: ILoopBaanItem = {
      jobTitle: "Senior Developer",
      grade: "D6V",
      fromDate: new Date("2024-01-01"),
      toDate: null,
      performanceBreach: 1.5,
      naturePerformances: "Development"
    };

    return [item1, item2, item3];
*/
  }
//

// parse date
parseDate(dateString: string): Date {
  if (dateString) {
      return new Date(dateString);
  }
  return new Date();
}
//

public AddAanvraag(){
  this.currentPeriod = new Date();
  this.createNewAanvraag();
  this.aanvraagService.postAanvragen(this.newApplication)
  .subscribe(
    response => {
      const parseResponse = response as IApplication;
      this.savedId = parseResponse.id;
      this.createLoopBaan();
      this.openPopUp();
    },
    error => console.error(error)
  );

  }

public createNewAanvraag(): void{
  this.newApplication.firstname = this.firstname;
  this.newApplication.lastname = this.lastname;
  this.newApplication.nationalRegisterNr = this.nationalnr;
  this.newApplication.birthplace = this.birthplace;
  this.newApplication.birthdate = this.birthdate;
  this.newApplication.mainProfession = this.mainProfession;
  this.newApplication.jobTitle = this.jobTitle;
  this.newApplication.gradeOrRank= this.gradeOrRank;
  this.newApplication.initiator = this.initiator;
  this.newApplication.distinctionsReceived = this.distinctionsReceived;
  this.newApplication.totYearService = this.serviceYears;
  this.newApplication.totMonthService = this.serviceMonths;

  this.newApplication.resultEvaluation = this.resuEvaluation;
  this.newApplication.sanctions = this.sanctions;
  this.newApplication.salaryScale = this.salaryScale;

  this.newApplication.status = "wachten op goedkeuring";
  this.newApplication.proposedHonoraryDistinction= this.proposedDistinction;
  this.newApplication.reportAboutInvolved = this.reportInvolved;
}
public createLoopBaan (): void {
  for(let i = 0 ; i <8; i++){
    var loopbaan: ICareer = {
      id: 0,
      grade: this.grade[i],
      fromDate : this.from[i],
      toDate : this.to[i],
      performanceBreach : this.performanceBreach[i],
      naturePerformances : this.naturePerformances[i],
      application: {"id": this.savedId, "lastname":null, "distinctionsReceived":null,
    "jobTitle":null,"birthplace":null, "birthdate":null, "gradeOrRank":null,"mainProfession":null,"initiator":null,
  "resultEvaluation":null,"nationalRegisterNr":null, "status":null, "salaryScale": null,
"totYearService":null, "totMonthService" : null,"sanctions":null, "reportAboutInvolved":null,"proposedHonoraryDistinction":null,"firstname":null, "certificate":null,"decision":null,"decisionTranslated":null,"advice":null}

} ;
if(this.grade[i] != undefined || this.from[i] != undefined || this.to[i] != undefined
  || this.performanceBreach[i] != undefined  || this.naturePerformances[i] != undefined)
   { this.aanvraagService.postLoopBaan(loopbaan)
    .subscribe(
      response =>{
        console.log(response)},
        error => console.log(error));
      }
    }
}
public openPopUp():void{
  this.getParent();
-  this.sendButton.nativeElement.classList.add("hiddenSendButton")
  this.parentCompleted.classList.add("open-popup");

}
public closePopUp():void{
  this.getParent();
  this.parentCompleted.classList.remove("open-popup");
 this.sendButton.nativeElement.classList.remove("hiddenSendButton")
 setTimeout(() => {
  this.router.navigate(["/overview"])
}, 10);

}
public getParent() {
  this.parentCompleted = this.parentRef.nativeElement;
}

trackByFn(index: any, item: any) {
  return index; // or a unique identifier for each item
}
}

