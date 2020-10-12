import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericTreeComponent } from 'src/app/components/generictree/generictree.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Components } from 'src/app/intefaces/Components';
import { HtmlFileService } from 'src/app/services/htmlfile.service';

@Component({
  selector: 'app-htmlfile-edit',
  templateUrl: './htmlfile-edit.component.html',
  styleUrls: ['./htmlfile-edit.component.scss']
})
export class HtmlFileEditComponent implements OnInit {
  htmlFile: Components;
  editForm: FormGroup;
  submitted = false;
  successMessage: string;
  errorMessage: string;
  paramHTMLFileID: number;
  formTitle: string;
  formMode: string;
  parentFolderID: any;
  htmlfiles: Components[];
  viewRenderizedHTML: boolean = true;


  @ViewChild(GenericTreeComponent, { static: false }) genericTree: GenericTreeComponent;


  constructor(private formBuilder: FormBuilder, private routerService: Router, private titleService: Title, private htmlfileService: HtmlFileService,
    private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    this.buildForm();
    this.setTitle("TwoDrive");

    this.paramHTMLFileID = this.currentRoute.snapshot.params['id'];
    console.log(this.paramHTMLFileID);


    if (!this.isFormInsertMode()) {
      this.formTitle = "Update HTML File";
      this.gethtmlFile();
    } else {
      this.formTitle = "New HTML File";
    }
  }
  get f() { return this.editForm.controls; }

  selectValue(parentFolderID: any) {
    this.parentFolderID = parentFolderID;
  }

  gethtmlFile() {
    this.htmlfileService.getHtmlFile(this.paramHTMLFileID, this.viewRenderizedHTML).subscribe(
      ((data: any) => this.resultGetHTMLFile(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  resultGetHTMLFile(htmlFileToBeSeted: Components) {
    this.htmlFile = htmlFileToBeSeted;
    console.log(this.htmlFile);
    this.editForm.controls['name'].setValue(this.htmlFile.name);
    this.editForm.controls['content'].setValue(this.htmlFile.content);
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
    this.htmlfileService.creatHtmlFile(this.htmlFile).subscribe(
      ((data: any) => this.showSuccessMessage(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  updateFolder(): void {
    this.getDataFromForm();
    this.htmlfileService.updateHtmlFile(this.paramHTMLFileID, this.htmlFile).subscribe(
      ((data: any) => this.showSuccessMessage(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }


  getDataFromForm(): void {
    if (this.isFormInsertMode()) {
      this.htmlFile = {
        id: 0,
        name: this.editForm.get('name').value,
        parentID: this.parentFolderID,
        parentName: '',
        extension: '',
        creationDate: null,
        modificationDate: null,
        icon: '',
        directChildComponents: null,
        content: this.editForm.get('content').value,
        ownerID: 0

      }
    } else {
      this.htmlFile.name = this.editForm.get('name').value;
      this.htmlFile.content = this.editForm.get('content').value;
      this.htmlFile.parentID = this.parentFolderID;
    }
  }


  buildForm() {
    this.submitted = false;
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      content: ['']
    });
  }


  isFormInsertMode(): boolean {
    return this.paramHTMLFileID == null;
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

    this.routerService.navigate(['/htmlfilelist']);
  }

  setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }
}
