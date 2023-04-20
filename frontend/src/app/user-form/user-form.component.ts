import { Component, OnInit } from '@angular/core';
import { User } from '../login/user';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  allUsers : User[] = [];
  newUser : User = {email: "", password:"", role:""}
  roles :string[]= ['Developer','Onderzoeker', 'Initiatiefnemer', 'Adviseur', "Besluitnemer", "OorkondeOpmaker", "Vertaler"];
  showNotCompleteMessage : boolean = false;
  showErrorEmailMessage : boolean = false;
  showUserCreatedMessage: boolean = false;

  constructor(public service: LoginService) { 
    service.GetUsersObservable().subscribe(users=> this.allUsers = users);

  }
  
  ngOnInit(): void {
  }
  OnSubmit():void{
    if(this.newUser.email =="" 
    || this.newUser.password == ""
    || this.newUser.role == "")
    this.showNotCompleteMessage = true;

    else{
      this.EmailExists();
      if(!this.showErrorEmailMessage)
          {
              this.service.CreateUser(this.newUser).subscribe(
                response => {
                  console.log('User created successfully:', response);
                  this.newUser.email="";
                  this.newUser.password="";
                  this.newUser.role="";
                  this.showUserCreatedMessage = true;
                },
                error => {
                  console.log('Error creating user:', error);
                }
              )
            console.log("SUBMITTED");
          }
    }
    setTimeout(() => {
      this.showNotCompleteMessage = false;
      this.showErrorEmailMessage = false;
      this.showUserCreatedMessage = false;
    }, 5000);
  }
  

  EmailExists():void{
      this.showErrorEmailMessage = this.allUsers.some(user=> user.email === this.newUser.email)
  }
}
