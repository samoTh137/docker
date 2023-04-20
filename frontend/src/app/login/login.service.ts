import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private client: HttpClient, private router: Router) {
    this.GetAll();
   }

  public users: User[] = [];
  public email: String = "";
  public password: String = "";
  public logedIn: boolean = false;
  public throwError: boolean = false;

  GetAll() {
    return this.client.get<User[]>("http://projectvm8.p.bletchley.cloud:10056/users").subscribe(res => this.users = res)
  }
  GetUsersObservable(): Observable<User[]> {
    return this.client.get<User[]>("http://projectvm8.p.bletchley.cloud:10056/users").pipe(
      map(res => res)
    );
  }
  DeleteUserById(id: number): Observable<any> {
    return this.client.delete<User>(`http://projectvm8.p.bletchley.cloud:10056/users/${id}`)
      .pipe(
        catchError(err => {
          console.log('Error deleting user:', err);
          throw err;
        })
      );
  }
  CreateUser(user:User):Observable<User>{
    return this.client.post<User>("http://projectvm8.p.bletchley.cloud:10056/users", user)
    .pipe(
      catchError(err => {
        console.log('Error creating user:', err);
        throw err;
      })
    );
  }
  CheckLogin() {
    let foundUser = false;
    this.users.forEach(u => {
      if (u.email == this.email) {
        if (u.password == this.password) {
          foundUser = true;
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

      if(foundUser) {
        this.logedIn = true;
        localStorage.setItem('loggedIn', JSON.stringify(true));
        this.router.navigate(["/overview"])
      }
    });
  }
  
  GetRoleOfUser():string{
    return this.users.filter(user => user.email == this.email)[0].role;
  }

}
