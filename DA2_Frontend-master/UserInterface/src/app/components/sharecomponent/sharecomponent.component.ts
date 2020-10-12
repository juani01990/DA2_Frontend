import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericTreeComponent } from '../generictree/generictree.component';
import { User } from 'src/app/intefaces/User';
import { FriendsService } from 'src/app/services/friends.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sharecomponent',
  templateUrl: './sharecomponent.component.html',
  styleUrls: ['./sharecomponent.component.scss']
})
export class ShareComponentComponent implements OnInit {
  componentToShareID: number = 0;
  friends: Array<User>;
  errorMessage: string = "";
  successMessage: string = "";
  p:number;
  
  @ViewChild(GenericTreeComponent, { static: false }) genericTree: GenericTreeComponent;


  constructor(private friendsService: FriendsService, private routerService: Router) { }

  ngOnInit() {
    this.loadMyFriends();
  }

  selectValue(componentID: any) {
    this.componentToShareID = componentID;

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

  showErrorMessage(error: string): void {
    this.errorMessage = error;
  }

  showSuccessMessage(succesMessage: string): void {
    this.successMessage = succesMessage;
  }

  shareComponent(friendID: number, friendName: string) {
    if (!this.componentToShareID) {
      this.errorMessage = "Please select a file or folder to be shared with " + friendName;
    } else {
      this.friendsService.shareComponent(this.componentToShareID, friendID).subscribe(
        ((data: any) => this.showSuccessMessage(data)),
        ((error: any) => this.showErrorMessage(error))
      );
    }
  }

  onBack(): void {
    this.routerService.navigate(['/friendsList']);
  }
}
