import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { ReportResult } from 'src/app/intefaces/ReportResult';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top10userfiles',
  templateUrl: './top10userfiles.component.html',
  styleUrls: ['./top10userfiles.component.scss']
})
export class Top10UserFilesComponent implements OnInit {
  reportResult: Array<ReportResult>;
  errorMessage: string = "";
  p:number;

  constructor(private reportService: ReportService, private routerService: Router) { }

  ngOnInit() {
    this.loadReport();
  }


  loadReport() {
    this.reportService.getTop10UserMoreFiles().subscribe(
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
