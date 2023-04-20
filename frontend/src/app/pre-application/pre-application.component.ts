import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pre-application',
  templateUrl: './pre-application.component.html',
  styleUrls: ['./pre-application.component.css']
})
export class PreApplicationComponent implements OnInit {

  rijksregisternr: string;

  public NextStep(){
    this.router.navigate(['/application', this.rijksregisternr]);
    }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
