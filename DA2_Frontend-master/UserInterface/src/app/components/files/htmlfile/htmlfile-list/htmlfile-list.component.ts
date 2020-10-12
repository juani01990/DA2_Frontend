  import { Component, OnInit } from '@angular/core';
  import { Components } from 'src/app/intefaces/Components';
  import { Router } from '@angular/router';
  import { Title } from '@angular/platform-browser';
  import { HtmlFileService } from 'src/app/services/htmlfile.service';
  
  @Component({
    selector: 'app-htmlfile-list',
    templateUrl: './htmlfile-list.component.html',
    styleUrls: ['./htmlfile-list.component.scss']
  })
  export class HtmlFileListComponent implements OnInit {
    errorMessage: string = "";
    htmlfiles: Array<Components>;
    successMessage: string = "";
    htmlNameToFilter:string = "";
    p:number;
  
    
    constructor(private routerService: Router, private titleService: Title, private htmlfileService: HtmlFileService) { }
  
    ngOnInit() {
      this.setTitle("TwoDrive");
      this.loadHTMLFiles();
    }
  
    loadHTMLFiles(): void {
      this.htmlfileService.getHtmlFiles().subscribe(
        ((data: any) => this.resultLoadHTMLFiles(data)),
        ((error: any) => this.showErrorMessage(error))
      )
    }
     resultLoadHTMLFiles(data: Array<Components>) {
      this.htmlfiles = data;
      console.log(this.htmlfiles);
    }
  
    deleteHTMLFile(textfileName: string, htmlFileID: number): void {
      if (window.confirm('Are you sure you want to delete the HTML File ' + textfileName + '?')) {
  
        this.htmlfileService.deleteHtmlFile(htmlFileID).subscribe(
          ((data: any) => this.showSuccessMessage(data)),
          ((error: any) => this.showErrorMessage(error))
        )
      }
    }
  
    showSuccessMessage(succesMessage: string): void {
      this.successMessage = succesMessage;
      this.loadHTMLFiles();
    }
  
    showErrorMessage(error: string): void {
      this.errorMessage = error;
    }
  
    onBack() {
      this.routerService.navigate(['/home']);
    }
  
     setTitle(newTitle: string) {
      this.titleService.setTitle(newTitle);
    }
  }


