import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private client: HttpClient, private router: Router) { }

  public users: User[] = [];
  public email: String = "";
  public password: String = "";
  public logedIn: boolean = false;
  public throwError: boolean = false;

  GetAll() {
    return this.client.get<User[]>("http://localhost:8080/users").subscribe(res => this.users = res)
  }

  CheckLogin() {
    this.users.forEach(u => {
      if (u.email == this.email) {
        if (u.password == this.password) {
          this.logedIn = true;
          localStorage.setItem('loggedIn', JSON.stringify(true));
          this.router.navigate(["/overview"])
        } else {
          this.throwError = true;
          this.logedIn = false;
          setInterval(() => this.throwError = false, 3000)
        }
      } else {
        this.throwError = true;
        this.logedIn = false;
        setInterval(() => this.throwError = false, 3000)

      }
    });


  }


}
