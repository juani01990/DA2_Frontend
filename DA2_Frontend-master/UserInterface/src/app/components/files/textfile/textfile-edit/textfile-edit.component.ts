import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericTreeComponent } from 'src/app/components/generictree/generictree.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Components } from 'src/app/intefaces/Components';
import { TextFileService } from 'src/app/services/textfile.service';

@Component({
  selector: 'app-textfile-edit',
  templateUrl: './textfile-edit.component.html',
  styleUrls: ['./textfile-edit.component.scss']
})
export class TextFileEditComponent implements OnInit {
  textFile: Components;
  editForm: FormGroup;
  submitted = false;
  successMessage: string;
  errorMessage: string;
  paramTextFileID: number;
  formTitle: string;
  formMode: string;
  parentFolderID: any;

  @ViewChild(GenericTreeComponent, { static: false }) genericTree: GenericTreeComponent;

  constructor(private formBuilder: FormBuilder, private routerService: Router, private currentRoute: ActivatedRoute,
    private textFileService: TextFileService, private titleService: Title) { }

    ngOnInit() {
      this.buildForm();
      this.setTitle("TwoDrive");
  
      this.paramTextFileID = this.currentRoute.snapshot.params['id'];
      
  
      if (!this.isFormInsertMode()) {
        this.formTitle = "Update Text File";
        this.getTextFile();
      } else {
        this.formTitle = "New Text File";
      }
    }
  
    get f() { return this.editForm.controls; }
    
    selectValue(parentFolderID: any) {
      this.parentFolderID = parentFolderID;
    }

    getTextFile() {
      this.textFileService.getTextFile(this.paramTextFileID).subscribe(
        ((data: any) => this.resultGetTextFile(data)),
        ((error: any) => this.showErrorMessage(error))
      )
    }

    resultGetTextFile(textFileToBeSeted: Components){
      this.textFile = textFileToBeSeted;
      this.editForm.controls['name'].setValue(this.textFile.name);
      this.editForm.controls['content'].setValue(this.textFile.content);
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
      this.textFileService.creatTextFile(this.textFile).subscribe(
        ((data: any) => this.showSuccessMessage(data)),
        ((error: any) => this.showErrorMessage(error))
      )
    }
  
    updateFolder(): void {
      this.getDataFromForm();
      this.textFileService.updateTextFile(this.paramTextFileID, this.textFile).subscribe(
        ((data: any) => this.showSuccessMessage(data)),
        ((error: any) => this.showErrorMessage(error))
      )
    }
  
  
    getDataFromForm(): void {
      if (this.isFormInsertMode()) {
        this.textFile = {
          id: 0,
          name: this.editForm.get('name').value,
          parentID: this.parentFolderID,
          parentName: '',
          extension: '',
          creationDate: null,
          modificationDate: null,
          icon: '',
          directChildComponents: null,
          content:  this.editForm.get('content').value,
          ownerID: 0
  
        }
      } else {
        this.textFile.name = this.editForm.get('name').value;
        this.textFile.content = this.editForm.get('content').value;
        this.textFile.parentID = this.parentFolderID;
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
      return this.paramTextFileID == null;
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
      this.routerService.navigate(['/textfilelist']);
    }

    setTitle(newTitle: string): void {
      this.titleService.setTitle(newTitle);
    }
}
