import { Component, OnInit } from '@angular/core';
import { Components } from 'src/app/intefaces/Components';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ShareComponentService } from 'src/app/services/sharedcomponent.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/intefaces/User';



@Component({
  selector: 'app-sharedcomponent-list',
  templateUrl: './sharedcomponent-list.component.html',
  styleUrls: ['./sharedcomponent-list.component.scss']
})
export class SharedComponentListComponent implements OnInit {
  errorMessage: string = "";
  components: Array<Components>;
  successMessage: string = "";
  htmlNameToFilter:string = "";
  showComponentDetailSection:boolean= false;
  displayForm: FormGroup;
  componentToDisplay: Components;
  users:Array<User>;
  componentNameToFilter:string="";
  p:number;
  
  constructor(private formBuilder: FormBuilder, private routerService: Router, private titleService: Title, private sharedWithMeService: ShareComponentService, private userService: UserService) { }

  ngOnInit() {
    this.setTitle("TwoDrive");
    this.loadSharedComponents();
    this.buildForm();
    this.loadUsers()
  }

  loadSharedComponents(): void {
    this.sharedWithMeService.getSharedComponents().subscribe(
      ((data: any) => this.resultloadSharedComponents(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }
   resultloadSharedComponents(data: Array<Components>) {
    this.components = data;
   
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

  getOwnerOfComponent(ownerID: number): string {
    
    return this.users.find(x=> x.id == ownerID).name;
  }
  showSuccessMessage(succesMessage: string): void {
    this.successMessage = succesMessage;
    this.loadSharedComponents();
  }

  showErrorMessage(error: string): void {
    this.errorMessage = error;
  }
  onBack() {
    this.routerService.navigate(['/home']);
  }

  onBackComponentDetail(){
    this.showComponentDetailSection = false;
  }

   setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  showComponentDetail(componentToDisplayID:number){
    this.showComponentDetailSection = true;
    this.componentToDisplay = this.components.find(component => component.id ==componentToDisplayID);
    console.log(this.componentToDisplay);
    this.displayForm.controls['name'].setValue(this.componentToDisplay.name);
      this.displayForm.controls['content'].setValue(this.componentToDisplay.content);
  }

  buildForm() {
    this.displayForm = this.formBuilder.group({
      name: [{value:'',disabled: true}],
      content: [{value:'',disabled: true}]
    });
  }
}
