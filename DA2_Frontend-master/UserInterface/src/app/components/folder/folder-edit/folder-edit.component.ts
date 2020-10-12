import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Components } from 'src/app/intefaces/Components';
import { Router, ActivatedRoute } from '@angular/router';
import { FolderService } from 'src/app/services/folder.service';
import { Title } from '@angular/platform-browser';
import { GenericTreeComponent } from '../../generictree/generictree.component';


@Component({
  selector: 'app-folder-edit',
  templateUrl: './folder-edit.component.html',
  styleUrls: ['./folder-edit.component.scss'],

})
export class FolderEditComponent implements OnInit {

  folder: Components;
  editForm: FormGroup;
  submitted = false;
  successMessage: string;
  errorMessage: string;
  paramFolderID: number;
  formTitle: string;
  formMode: string;
  parentFolderID: any;

  @ViewChild(GenericTreeComponent, { static: false }) genericTree: GenericTreeComponent;

  constructor(private formBuilder: FormBuilder, private routerService: Router, private currentRoute: ActivatedRoute,
    private folderService: FolderService, private titleService: Title) { }

  ngOnInit() {
    this.buildForm();
    this.setTitle("TwoDrive");

    this.paramFolderID = this.currentRoute.snapshot.params['id'];

    if (!this.isFormInsertMode()) {
      this.formTitle = "Update Folder";
      this.getFolder();
    } else {
      this.formTitle = "New Folder";
    }
  }

  get f() { return this.editForm.controls; }


  selectValue(parentFolderID: any) {
    this.parentFolderID = parentFolderID;
  }

  getFolder() {
    this.folderService.getFolder(this.paramFolderID).subscribe(
      ((data: any) => this.resultGetFolder(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  buildForm() {
    this.submitted = false;
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  resultGetFolder(folderToBeSeted: Components) {
    this.folder = folderToBeSeted;
    this.editForm.controls['name'].setValue(this.folder.name);
  }

  isFormInsertMode(): boolean {
    return this.paramFolderID == null;
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }
    if (!this.isFormInsertMode()) {
      this.updateFolder();
    } else {
      this.insertFolder();
    }

  }

  insertFolder(): void {
    this.getDataFromForm();
    this.folderService.creatFolder(this.folder).subscribe(
      ((data: any) => this.showSuccessMessage(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  updateFolder(): void {
    this.getDataFromForm();
    this.folderService.updateFolder(this.paramFolderID, this.folder).subscribe(
      ((data: any) => this.showSuccessMessage(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }


  getDataFromForm(): void {
    if (this.isFormInsertMode()) {
      this.folder = {
        id: 0,
        name: this.editForm.get('name').value,
        parentID: this.parentFolderID,
        parentName: '',
        extension: '',
        creationDate: null,
        modificationDate: null,
        icon: '',
        directChildComponents: null,
        content: '',
        ownerID: 0

      }
    } else {
      this.folder.name = this.editForm.get('name').value;
      if (this.parentFolderID) {
        this.folder.parentID = this.parentFolderID;
      }

    }
  }

  showSuccessMessage(succesMessage: string): void {
    this.successMessage = succesMessage;
    if (this.isFormInsertMode()) {
      this.buildForm();
    } else {
      this.genericTree.getAllComponents();
    }
    this.genericTree.updateGenericTreeFromParent();
  }

  showErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }

  onBack(): void {
    this.routerService.navigate(['/folderlist']);
  }

  setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

}
