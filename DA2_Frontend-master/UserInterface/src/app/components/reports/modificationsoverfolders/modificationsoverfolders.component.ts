import { Component, OnInit } from '@angular/core';
import { ReportResult } from 'src/app/intefaces/ReportResult';
import { ReportService } from 'src/app/services/report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificationsoverfolders',
  templateUrl: './modificationsoverfolders.component.html',
  styleUrls: ['./modificationsoverfolders.component.scss']
})
export class ModificationsOverFoldersComponent implements OnInit {
  reportResult: Array<ReportResult>;
  errorMessage: string = "";
  p:number;

  constructor(private reportService: ReportService, private routerService: Router) { }

  ngOnInit() {
    this.loadReport();
  }


  loadReport() {
    this.reportService.getModificationsOverFolders().subscribe(
      ((data: Array<ReportResult>) => this.result(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  showErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  result(data: Array<ReportResult>): void {
    this.reportResult = data;
  }

  onBack() {
    this.routerService.navigate(["/home"]);
  }
}
