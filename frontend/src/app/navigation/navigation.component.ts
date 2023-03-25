import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private service: LoginService) { }

  ngOnInit(): void {

  }

  RefreshSession() {
    this.service.logedIn = false
    localStorage.setItem('loggedIn', JSON.stringify(false));

  }
}
