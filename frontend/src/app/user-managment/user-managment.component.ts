import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { User } from '../login/user';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  allUsers : User[] = [];
  showDeleteMessage : boolean = false;
  constructor(private service: LoginService) { 
   service.GetUsersObservable().subscribe(users=> this.allUsers = users);
  }

  ngOnInit(): void {
  }
  RemoveUserById(deleteUser:User, index: number):void{
    if (this.allUsers.length >1) {
      if(confirm(`Weet je zeker dat je "${deleteUser.email}" wilt verwijderen?`)){
    this.service.DeleteUserById(deleteUser.id!).subscribe(
      response => {
        console.log('User deleted successfully:', response);
        this.allUsers.splice(index, 1);

      },
      error => {
        console.log('Error deleting user:', error);
      }
    )};
  }
  else 
    {this.showDeleteMessage = true;
      setTimeout(() => {
        this.showDeleteMessage = false;
      }, 5000);
    }
}
  
  }

