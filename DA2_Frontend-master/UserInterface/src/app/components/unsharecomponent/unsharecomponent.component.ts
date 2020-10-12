import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Components } from 'src/app/intefaces/Components';
import { FriendsService } from 'src/app/services/friends.service';
import { ShareComponentService } from 'src/app/services/sharedcomponent.service';

@Component({
  selector: 'app-unsharecomponent',
  templateUrl: './unsharecomponent.component.html',
  styleUrls: ['./unsharecomponent.component.scss']
})
export class UnShareComponentComponent implements OnInit {
  paramFriendID: number = 0;
  paramloggedUserID: number = 0;
  usernameOffriendToUnshare: string = '';
  errorMessage: string = "";
  components: Array<Components>;
  successMessage: string = "";
  componentNameToFilter= "";
  p:number;

  constructor(private routerService: Router, private currentRoute: ActivatedRoute,
    private titleService: Title, private sharedWithMeService: ShareComponentService, private friendsService: FriendsService) { }

  ngOnInit() {
    this.setTitle("TwoDrive");
    this.paramFriendID = this.currentRoute.snapshot.params['id'];
    this.paramloggedUserID = this.currentRoute.snapshot.params['loggeduserid'];
    this.usernameOffriendToUnshare = this.currentRoute.snapshot.params['friendusername'];

    this.loadSharedComponents();
  }

  loadSharedComponents(): void {
    this.sharedWithMeService.getSharedComponentsWith(this.paramFriendID).subscribe(
      ((data: any) => this.resultloadSharedComponents(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }
  resultloadSharedComponents(data: Array<Components>) {
    this.components = data;
    console.log(this.components);
  }

  showSuccessMessage(succesMessage: string): void {
    this.successMessage = succesMessage;
    this.loadSharedComponents();
  }

  showErrorMessage(error: string): void {
    this.errorMessage = error;
  }
  onBack() {
    this.routerService.navigate(['/friendsList']);
  }
  setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  unShareComponent(componentToUnShare: number) {
    if (window.confirm('Are you sure you want to unshare the component?')) {
      this.friendsService.unShareComponent(componentToUnShare, this.paramFriendID).subscribe(
        ((data: any) => this.showSuccessMessage(data)),
        ((error: any) => this.showErrorMessage(error))
      );
    }
  }

}