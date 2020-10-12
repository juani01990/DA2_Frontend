import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/intefaces/User';
import { FriendsService } from 'src/app/services/friends.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
import { MasterPageService } from 'src/app/services/master-page.service';

@Component({
  selector: 'app-myfriends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  errorMessage: string = "";
  friends: Array<User>;
  usernameToFilter: string = "";
  successMessage: string = "";
  users: Array<User>;
  showSelectUsers: boolean = false;
  selectedUserID: number;
  loggedUser: User;
  p:number;

  constructor(private friendsService: FriendsService, private routerService: Router, private titleService: Title,
    private userService: UserService, private masterPageService: MasterPageService) { }

  ngOnInit() {
    this.setTitle("TwoDrive");
    this.getUserFromSession();
    this.loadMyFriends();
  }

  getUserFromSession() {
    this.masterPageService.getUserFromSession().subscribe(
      ((data: any) => this.result(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  result(userToBeSeted: User) {
    this.loggedUser = userToBeSeted;
  }


  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  showSuccessMessage(succesMessage: string): void {
    this.successMessage = succesMessage;
    this.hideSelectUser();
    this.loadMyFriends();

  }

  showErrorMessage(error: string): void {
    this.errorMessage = error;
  }

  loadMyFriends(): void {
    this.friendsService.getFriends().subscribe(
      ((data: Array<User>) => this.resultloadMyFriends(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  resultloadMyFriends(data: Array<User>): void {
    this.friends = data;
  }

  onBack() {
    this.routerService.navigate(['/home']);
  }

  deleteFriend(userName: string, userID: number): void {
    if (window.confirm('Are you sure you want to delete the user ' + userName + '?')) {

      this.friendsService.deleteFriend(userID).subscribe(
        ((data: any) => this.showSuccessMessage(data)),
        ((error: any) => this.showErrorMessage(error))
      )
    }
  }

  showSelectOfUsers() {
    this.userService.getUsers().subscribe(
      ((data: Array<User>) => this.resultshowSelectOfUsers(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  resultshowSelectOfUsers(data: Array<User>): void {
    this.users = data;
    this.users = this.users.filter(user => user.id !== this.loggedUser.id &&
      !this.friends.some(friend => (friend.id === user.id && friend.name === user.name)))

    this.showSelectUsers = true;
  }

  hideSelectUser() {
    this.showSelectUsers = false;
  }

  addFriend() {
    this.friendsService.addFriend(this.selectedUserID).subscribe(
      ((data: any) => this.showSuccessMessage(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }
}
