import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Components } from 'src/app/intefaces/Components';
import { FolderService } from 'src/app/services/folder.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-folder',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss']
})
export class FolderListComponent implements OnInit {
  errorMessage: string = "";
  folders: Array<Components>;
  folderNameToFilter: string = "";
  successMessage: string = "";
  p:number;

  constructor(private folderService: FolderService, private routerService: Router, private titleService: Title) { }

  ngOnInit() {
    this.setTitle("TwoDrive");
    this.loadFolders();

  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  getParentName(parentFolderID: number): string {
    if (parentFolderID) {
      return this.folders.find(x => x.id === parentFolderID).name;
    }
    return '-'

  }

  deleteFolder(folderName: string, folderID: number): void {
    if (window.confirm('Are you sure you want to delete the Folder ' + folderName + '?')) {

      this.folderService.deleteFolder(folderID).subscribe(
        ((data: any) => this.showSuccessMessage(data)),
        ((error: any) => this.showErrorMessage(error))
      )
    }
  }
  
  showSuccessMessage(succesMessage: string): void {
    this.successMessage = succesMessage;
    this.loadFolders();
  }

  showErrorMessage(error: string):void {
    this.errorMessage = error;
  }


  loadFolders():void {
    this.folderService.getFolders().subscribe(
      ((data: Array<Components>) => this.result(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  result(data: Array<Components>):void {
    this.folders = data;
  }

  onBack() {
    this.routerService.navigate(['/home']);
  }
}
