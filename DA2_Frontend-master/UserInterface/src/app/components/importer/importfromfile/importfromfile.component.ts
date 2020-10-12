import { Component, OnInit } from '@angular/core';
import { ImporterService } from 'src/app/services/importer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/intefaces/User';
import { Importer } from 'src/app/intefaces/Importer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-importfromfile',
  templateUrl: './importfromfile.component.html',
  styleUrls: ['./importfromfile.component.scss']
})
export class ImportFromFileComponent implements OnInit {
  users: Array<User>;
  errorMessage: string = "";
  successMessage: string;
  selectedUserID: number = 0;
  filePath: string = "";
  importerName: string = "";
  infoToImport: Importer;

  constructor(private routerService: Router, private userService: UserService, private importerService: ImporterService, private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.showSelectOfUsers();
    this.importerName = this.currentRoute.snapshot.params['selectedImporter'];
  }
  showSelectOfUsers() {
    this.userService.getUsers().subscribe(
      ((data: Array<User>) => this.resultshowSelectOfUsers(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }
  resultshowSelectOfUsers(users: Array<User>): void {
    this.users = users;
  }


  onBack() {
    this.routerService.navigate(["/importer"]);
  }

  importData() {
    if (!this.selectedUserID || !this.filePath) {
      this.errorMessage = "Please select an user and a path for the file to start the import"
    } else {
      this.infoToImport = {
        userId: this.selectedUserID,
        name: this.importerName,
        expectedType: environment.ExpectedFile,
        filepath: this.filePath
      }
      this.importerService.importData(this.infoToImport).subscribe(
        ((data: any) => this.showSuccessMessage(data)),
        ((error: any) => this.showErrorMessage(error))
      )
    }
  }

  showSuccessMessage(succesMessage: any): void {
    this.successMessage = succesMessage;
  }

  showErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }
}
