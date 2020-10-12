import { Component, OnInit } from '@angular/core';
import { ImporterService } from 'src/app/services/importer.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Importer } from 'src/app/intefaces/Importer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-importdata',
  templateUrl: './importdata.component.html',
  styleUrls: ['./importdata.component.scss']
})
export class ImportDataComponent implements OnInit {
  errorMessage: string = "";
  importersAvailable: Array<Importer>;
  successMessage: string = "";
  selectedImporter: Importer;

  constructor(private importerService: ImporterService, private routerService: Router, private titleService: Title) { }

  ngOnInit() {
    this.setTitle("TwoDrive");
    this.loadImporters();
  }


  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  loadImporters(): void {
    this.importerService.getAvailableImporters().subscribe(
      ((data: Array<Importer>) => this.result(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  showErrorMessage(error: string): void {
    this.errorMessage = error;
  }
  result(data: Array<Importer>): void {
    this.importersAvailable = data;
    console.log(this.importersAvailable);
  }

  onBack() {
    this.routerService.navigate(['/home']);
  }

  chargeData() {
    if (!this.selectedImporter) {
      this.errorMessage = "Select one of the available importers"
    } else {
      this.redirectTo();
    }
  }

  redirectTo() {
    switch (this.selectedImporter.expectedType) {
      case environment.ExpectedFile:
        this.routerService.navigate(['/importfromfile', this.selectedImporter.name]);
        break;
      default:
    }
  }

}
