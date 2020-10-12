import { Component, OnInit, ViewChild } from '@angular/core';
import { Components } from 'src/app/intefaces/Components';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HtmlFileService } from 'src/app/services/htmlfile.service';
import { GenericTreeComponent } from 'src/app/components/generictree/generictree.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-htmlfile-view',
  templateUrl: './htmlfile-view.component.html',
  styleUrls: ['./htmlfile-view.component.scss']
})
export class HtmlFileViewComponent implements OnInit {
  paramHTMLFileID: number;
  paramloggedUserID: number;
  formTitle: string;
  textFile: Components;
  editForm: FormGroup;
  errorMessage: string;
  viewRenderizedHTML: boolean = false;
  displayLink:string= "[View renderized HTML]"
 
  @ViewChild(GenericTreeComponent, { static: false }) genericTree: GenericTreeComponent;

  constructor(private formBuilder: FormBuilder, private routerService: Router, private currentRoute: ActivatedRoute,
    private htmlFileService: HtmlFileService, private titleService: Title) { }

    ngOnInit() {
      this.setTitle("TwoDrive");
      this.paramHTMLFileID = this.currentRoute.snapshot.params['id'];
        
      this.getTextFile();
      this.buildForm();
    }

    changeDisplayFormat(){
      this.viewRenderizedHTML = !this.viewRenderizedHTML;
      if (this.viewRenderizedHTML){
        this.displayLink = "[View HTML as plain text]"
      }else{
        this.displayLink = "[View renderized HTML]"
      }
      this.getTextFile();
    }


    getTextFile() {
      this.htmlFileService.getHtmlFile(this.paramHTMLFileID, this.viewRenderizedHTML).subscribe(
        ((data: any) => this.resultGetTextFile(data)),
        ((error: any) => this.showErrorMessage(error))
      )
    }
  
    showErrorMessage(errorMessage: string): void {
      this.errorMessage = errorMessage;
    }
    resultGetTextFile(textFileToBeSeted: Components){
      this.textFile = textFileToBeSeted;
      this.editForm.controls['name'].setValue(this.textFile.name);
      this.editForm.controls['content'].setValue(this.textFile.content);
      this.formTitle = this.textFile.name; 
    }
  
    setTitle(newTitle: string): void {
      this.titleService.setTitle(newTitle);
    }

    buildForm() {
      this.editForm = this.formBuilder.group({
        name: [{value:'',disabled: true}],
        content: [{value:'',disabled: true}]
      });
    }


    onBack(): void {
      this.routerService.navigate(['/htmlfilelist']);
    }
    
}
