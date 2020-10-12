import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericTreeComponent } from 'src/app/components/generictree/generictree.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';
import { TextFileService } from 'src/app/services/textfile.service';
import { Title } from '@angular/platform-browser';
import { Components } from 'src/app/intefaces/Components';


@Component({
  selector: 'app-textfile-view',
  templateUrl: './textfile-view.component.html',
  styleUrls: ['./textfile-view.component.scss']
})
export class TextFileViewComponent implements OnInit {
  paramTextFileID: number;
  paramloggedUserID: number;
  formTitle: string;
  textFile: Components;
  editForm: FormGroup;
  errorMessage: string;
  previousRouter:string;
  
  @ViewChild(GenericTreeComponent, { static: false }) genericTree: GenericTreeComponent;

  constructor(private formBuilder: FormBuilder, private routerService: Router, private currentRoute: ActivatedRoute,
    private textFileService: TextFileService, private titleService: Title) {
  
        }


  ngOnInit() {
    this.setTitle("TwoDrive");
    this.paramTextFileID = this.currentRoute.snapshot.params['id'];
    this.paramloggedUserID = this.currentRoute.snapshot.params['loggeduserid'];

    this.getTextFile();
    this.buildForm();
  }

  buildForm() {
    this.editForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }],
      content: [{ value: '', disabled: true }]
    });
  }

  getTextFile() {
    this.textFileService.getTextFile(this.paramTextFileID).subscribe(
      ((data: any) => this.resultGetTextFile(data)),
      ((error: any) => this.showErrorMessage(error))
    )
  }

  showErrorMessage(errorMessage: string): void {
    this.errorMessage = errorMessage;
  }
  resultGetTextFile(textFileToBeSeted: Components) {
    this.textFile = textFileToBeSeted;
    this.editForm.controls['name'].setValue(this.textFile.name);
    this.editForm.controls['content'].setValue(this.textFile.content);
    this.formTitle = this.textFile.name;
  }

  setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }
  onBack(): void {
    this.routerService.navigate(['/textfilelist']);
  }
}

