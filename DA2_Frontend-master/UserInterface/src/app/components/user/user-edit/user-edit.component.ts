import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/intefaces/User';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User;
  editForm: FormGroup;
  submitted = false;
  successMessage: string;
  errorMessage: string;
  paramUserID: number;
  formTitle: string;
  formMode: string;


  constructor(private formBuilder: FormBuilder, private routerService: Router, private currentRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.buildForm();

    this.paramUserID = this.currentRoute.snapshot.params['id'];
    if (!this.isFormInsertMode()) {
      this.editForm.get('username').disable();
      this.formTitle = "Update User";
     this.getUser();
    } else {
      this.formTitle = "New User";
    }
  }

  get f() { return this.editForm.controls; }


  getUser(){
    this.userService.getUser(this.paramUserID).subscribe(
      ((data: any) => this.result(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  buildForm() {
    this.submitted = false;
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
      isadmin: [],
    });
  }

  result(userToBeSeted: User) {
    this.user = userToBeSeted;
    this.editForm.controls['name'].setValue(this.user.name);
    this.editForm.controls['lastname'].setValue(this.user.lastname);
    this.editForm.controls['username'].setValue(this.user.username);
    this.editForm.controls['email'].setValue(this.user.mail);
    this.editForm.controls['password'].setValue(this.user.password);
    this.editForm.controls['isadmin'].setValue(this.user.isAdmin);
  }

  isFormInsertMode(): boolean {
    return this.paramUserID == null;
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    if (!this.isFormInsertMode()) {
      this.updateUser();
    } else {
      this.insertUser();
    }

  }

  insertUser(): void {
    this.getDataFromForm();
    this.userService.createUser(this.user).subscribe(
      ((data: any) => this.showSuccessMessage(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  updateUser(): void {
    this.getDataFromForm();
    this.userService.updateUser(this.paramUserID, this.user).subscribe(
      ((data: any) => this.showSuccessMessage(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }


  getDataFromForm(): void {
    if (this.isFormInsertMode()) {

      let isAdminCheckValue = this.editForm.get('isadmin').value;
      if (!isAdminCheckValue) {
        isAdminCheckValue = false;
      }
      this.user = {
        id: 0,
        name: this.editForm.get('name').value,
        lastname: this.editForm.get('lastname').value,
        username: this.editForm.get('username').value,
        mail: this.editForm.get('email').value,
        password: this.editForm.get('password').value,
        isAdmin: this.editForm.get('isadmin').value,
      }
    } else {
      this.user.name = this.editForm.get('name').value;
      this.user.lastname = this.editForm.get('lastname').value;
      this.user.username = this.editForm.get('username').value;
      this.user.mail = this.editForm.get('email').value;
      this.user.password = this.editForm.get('password').value;
      this.user.isAdmin = this.editForm.get('isadmin').value;
    }
  }

  showSuccessMessage(succesMessage: string): void {
    this.successMessage = succesMessage;
    if (this.isFormInsertMode()) {
      this.buildForm();
    }

  }

  showErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  onBack(): void {
    this.routerService.navigate(['/userlist']);
  }

}
