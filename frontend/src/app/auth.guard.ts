import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  private loggedIn = false;


  constructor(private service: LoginService, private router: Router) {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    this.loggedIn = storedLoggedIn ? JSON.parse(storedLoggedIn) : this.service.logedIn;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem("loggedIn") == JSON.stringify(true)) {
      return true;
    } else {
      this.router.navigate(["/login"])
      return false
    }
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (localStorage.getItem("loggedIn") == JSON.stringify(true)) {
      return true;
    } else {
      this.router.navigate(["/login"])
      return false
    }
  }

}
