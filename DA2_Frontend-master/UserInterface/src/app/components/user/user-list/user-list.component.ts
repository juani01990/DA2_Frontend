import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/intefaces/User';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: Array<User>;
  successMessage: string = "";
  errorMessage: string = "";
  usernameToFilter: string = "";
  p: number;

  constructor(private userService: UserService, private titleService: Title, private routerService: Router) { }

  ngOnInit() {
    this.usernameToFilter = '';
    this.setTitle("TwoDrive");
    this.loadUsers();

  }

  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }


  loadUsers() {
    this.userService.getUsers().subscribe(
      ((data: Array<User>) => this.result(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  result(data: Array<User>): void {
    this.users = data;
  }

  deleteUser(userName: string, userID: number): void {
    if (window.confirm('Are you sure you want to delete the user ' + userName + '?')) {

      this.userService.deleteUser(userID).subscribe(
        ((data: any) => this.showSuccessMessage(data)),
        ((error: any) => this.showErrorMessage(error))
      )
    }
  }

  showSuccessMessage(succesMessage: string): void {
    this.successMessage = succesMessage;
    this.loadUsers();
  }

  showErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  onBack(): void {
    this.routerService.navigate(['/home']);
  }

}
