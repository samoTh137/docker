import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public service: LoginService) {

    service.GetAll();
  }

  ngOnInit(): void {
    if(localStorage.getItem("loggedIn", ))
    this.service.email = "";
    this.service.password = "";
  }

  Submit() {
    this.service.CheckLogin()

  }

}
