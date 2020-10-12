
import { Components } from 'src/app/intefaces/Components';
import { TextFileService } from 'src/app/services/textfile.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/intefaces/User';
import { MasterPageService } from 'src/app/services/master-page.service';




@Component({
  selector: 'app-textfile-list',
  templateUrl: './textfile-list.component.html',
  styleUrls: ['./textfile-list.component.scss']
})
export class TextFileListComponent implements OnInit {
  errorMessage: string = "";
  textfiles: Array<Components>;
  textFileNameToFilter: string = "";
  successMessage: string = "";
  ownerIDFilter: number = 0;
  sortConditions: Array<string> = [];
  dropdownList = [];
  selectedItems = [];
  orders = [];
  dropdownSettings: IDropdownSettings;
  selectedOrder: string = "asc";
  selectedOwnerID: number = 0;
  users: Array<User>;
  LoggedUser:User;
  p:number;

  constructor(private routerService: Router, private titleService: Title, private textfileService: TextFileService,
              private userService: UserService, private masterPageService: MasterPageService) { }

  ngOnInit() {
    this.setTitle("TwoDrive");
   

    this.dropdownList = [
      { item_id: 'name', item_text: 'Name' },
      { item_id: 'creationdate', item_text: 'Creation Date' },
      { item_id: 'modificationdate', item_text: 'Last Mod. Date' },

    ];
    this.orders = [
      { name: "Ascending", value: "asc" },
      { name: "Descending", value: "dsc" }
    ]
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 3,
    };

    this.initialLoadTextFiles();
   
  }

  initialLoadTextFiles() {
    this.masterPageService.getUserFromSession().subscribe(
      ((data: any) => this.resultinitialLoadTextFiles(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  resultinitialLoadTextFiles(userToBeSeted: User) {
    this.LoggedUser = userToBeSeted;
    this.ownerIDFilter = this.LoggedUser.id;
    this.selectedOwnerID = this.ownerIDFilter;
    if(this.LoggedUser.isAdmin){
      this.loadUsers();
    }
    this.loadTextFiles();  
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      ((data: Array<User>) => this.resultloadUsers(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  resultloadUsers(data: Array<User>):void {
    this.users = data;

  }

  loadTextFiles(): void {
    this.textfileService.getTextFiles(this.ownerIDFilter, this.textFileNameToFilter, this.sortConditions, this.selectedOrder).subscribe(
      ((data: any) => this.resultLoadTextFiles(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  deleteTextFile(textfileName: string, textFileID: number): void {
    if (window.confirm('Are you sure you want to delete the Text File ' + textfileName + '?')) {

      this.textfileService.deleteTextFile(textFileID).subscribe(
        ((data: any) => this.showSuccessMessage(data)),
        ((error: any) => this.showErrorMessage(error))
      )
    }
  }
  
  resultLoadTextFiles(data: Array<Components>): void {
    this.textfiles = data;
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  showSuccessMessage(succesMessage: string): void {
    this.successMessage = succesMessage;
    this.loadTextFiles();
  }

  showErrorMessage(error: string): void {
    this.errorMessage = error;
  }

  onBack() {
    this.routerService.navigate(['/home']);
  }

  searchTextFiles() {
    this.getSortConditions();
    this.getOwnerIDSelected();
    this.loadTextFiles();
  }

  getSortConditions() {
    this.sortConditions = [];
    this.selectedItems.forEach((item) => {
      this.sortConditions.push(item.item_id);
    });
  }

  getOwnerIDSelected(){
    if(this.selectedOwnerID){
      this.ownerIDFilter = this.selectedOwnerID;
    }else{
      this.ownerIDFilter = this.LoggedUser.id;
    }
  }

}

