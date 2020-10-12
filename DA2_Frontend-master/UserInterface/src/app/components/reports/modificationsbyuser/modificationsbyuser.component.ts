import { Component, OnInit } from '@angular/core';
import { ReportResult } from 'src/app/intefaces/ReportResult';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/intefaces/User';

@Component({
  selector: 'app-modificationsbyuser',
  templateUrl: './modificationsbyuser.component.html',
  styleUrls: ['./modificationsbyuser.component.scss']
})
export class ModificationsByUserComponent implements OnInit {
  reportResult: Array<ReportResult>;
  errorMessage: string = "";
  selectedUserID: number;
  fromDate: Date;
  toDate: Date;
  users: Array<User>;
  p:number;

  constructor(private reportService: ReportService, private routerService: Router, private userService: UserService) { }

  ngOnInit() {

    this.showSelectOfUsers();
  }
  searchData() {
    if (!this.selectedUserID || !this.fromDate || !this.toDate) {
      this.errorMessage = "Please select an user, and a range of dates";
    } else {
      if (this.fromDate > this.toDate) {
        this.errorMessage = "From Date must be less than To Date ";
      } else {
        this.loadReport();
      }
    }
  }
  showErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  loadReport() {
    this.reportService.getModificationsOverFilesByUser(this.selectedUserID, this.fromDate, this.toDate).subscribe(
      ((data: Array<ReportResult>) => this.resultloadReport(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  resultloadReport(data: Array<ReportResult>): void {
    this.reportResult = data;
  }


  showSelectOfUsers() {
    this.userService.getUsers().subscribe(
      ((data: Array<User>) => this.resultshowSelectOfUsers(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  resultshowSelectOfUsers(data: Array<User>): void {
    this.users = data;
  }

  onBack() {
    this.routerService.navigate(["/home"]);
  }

}
