import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { timeInterval, timeout } from 'rxjs';
import { ConfigService } from  '../config/config.service';
import { IAanvraag } from '../entities/Aanvraag';
import { ILoopBaan } from '../entities/LoopBaan';
@Component({
  selector: 'app-aanvraagFormulier',
  templateUrl: './aanvraagFormulier.component.html',
  styleUrls: ['./aanvraagFormulier.component.css']
})
export class AanvraagFormulierComponent implements OnInit {
  newAanvraag = {} as IAanvraag;
  newLoopBaan = {} as ILoopBaan;
  currentPeriod : Date = new Date();

  voornaam : string;
  achternaam : string;
  geboorteplaats: string;
  geboortedatum: Date;
  rijksregisternr: string;
  hoofdberoep : string;
  functietitel: string;
  graadOfRang: string;
  initiatiefnemer : string;
  ontvangenOnderscheidingen: string;
  dienstJaren : number;
  resuEvaluaties : string;
  sancties : string;
  dienst : Date;
  voorgesEreteken : string;
  verslagBetrokkene :string;
  loopOpBaan : ILoopBaan;
  salarisschaal : string;
  graad: string[] = [];
  van: Date[]= [];
  tot: Date[]= [];
  prestatiebreuk: string[]= [];
  aardPrestaties: string[]= [];
  dientsJaren: number;
  dienstMaanden: number;
  status : string = "";
savedId : number | undefined = -1;

@ViewChild("myPopup") private parentRef: ElementRef<HTMLElement>;
parentCompleted : HTMLElement;
@ViewChild("sendButton",{ static: true }) private sendButton: ElementRef;
public aanvragen: IAanvraag[];

  constructor(private aanvraagService: ConfigService, private router : Router) {
  }

  ngOnInit(){
    this.aanvraagService.getAanvragen().subscribe(a => this.aanvragen = a);
    };
public AddAanvraag(){
  this.currentPeriod = new Date();
  this.createNewAanvraag();
  this.aanvraagService.postAanvragen(this.newAanvraag)
  .subscribe(
    response => {
      const parseResponse = response as IAanvraag;
      this.savedId = parseResponse.id;
      this.createLoopBaan();
      this.openPopUp();      
    },
    error => console.error(error)
  );

  }

public createNewAanvraag(): void{
  this.newAanvraag.voornaam = this.voornaam;
  this.newAanvraag.achternaam = this.achternaam;
  this.newAanvraag.rijksregisternummer = this.rijksregisternr;
  this.newAanvraag.geboorteplaats = this.geboorteplaats;
  this.newAanvraag.geboortedatum = this.geboortedatum;
  this.newAanvraag.hoofdBeroep = this.hoofdberoep;
  this.newAanvraag.functieTitel = this.functietitel;
  this.newAanvraag.graadOfRang= this.graadOfRang;
  this.newAanvraag.initiatiefnemer = this.initiatiefnemer;
  this.newAanvraag.alOntvangenOnderscheidingen = this.ontvangenOnderscheidingen;
  this.newAanvraag.totJarenDienst = this.dienstJaren;
  this.newAanvraag.totMaandenDienst = this.dienstMaanden;

  this.newAanvraag.res_evaluatie = this.resuEvaluaties;
  this.newAanvraag.tuchtOfStrafsacties = this.sancties;
  this.newAanvraag.salarisschaal = this.salarisschaal;

  this.newAanvraag.status = "wachten op goedkeuring";
  this.newAanvraag.voorgesteldeEreteken= this.voorgesEreteken;
  this.newAanvraag.verslagBetrokkene = this.verslagBetrokkene;
}
public createLoopBaan (): void {  
  for(let i = 0 ; i <8; i++){
    var loopbaan: ILoopBaan = { 
      id: 0,
      graadOfRang: this.graad[i],
      van : this.van[i],
      tot : this.tot[i],
      prestatiebreuk : this.prestatiebreuk[i],
      aardPrestaties : this.aardPrestaties[i],
      aanvraag: {"id": this.savedId, "achternaam":null, "alOntvangenOnderscheidingen":null,
    "functieTitel":null,"geboorteplaats":null, "geboortedatum":null, "graadOfRang":null,"hoofdBeroep":null,"initiatiefnemer":null,
  "res_evaluatie":null,"rijksregisternummer":null, "status":null, "salarisschaal": null,
"totJarenDienst":null, "totMaandenDienst" : null,"tuchtOfStrafsacties":null, "verslagBetrokkene":null,"voorgesteldeEreteken":null,"voornaam":null}
  
} ;
if(this.graad[i] != undefined || this.van[i] != undefined || this.tot[i] != undefined
  || this.prestatiebreuk[i] != undefined  || this.aardPrestaties[i] != undefined)
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
}