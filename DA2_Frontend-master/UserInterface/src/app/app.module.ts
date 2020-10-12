import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MasterPageComponent } from './components/master-page/master-page.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { GenericTreeComponent } from './components/generictree/generictree.component';
import { TreeViewModule  } from '@syncfusion/ej2-angular-navigations';
import { UserNameFilterPipe } from './pipes/user-name-filter.pipe';
import { FolderListComponent } from './components/folder/folder-list/folder-list.component';
import { FolderEditComponent } from './components/folder/folder-edit/folder-edit.component';
import { HomeComponent } from './components/home/home.component';
import { TextFileListComponent } from './components/files/textfile/textfile-list/textfile-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TextFileEditComponent } from './components/files/textfile/textfile-edit/textfile-edit.component';
import { TextFileViewComponent } from './components/files/textfile/textfile-view/textfile-view.component';
import { HtmlFileListComponent } from './components/files/htmlfile/htmlfile-list/htmlfile-list.component';
import { HtmlFileEditComponent } from './components/files/htmlfile/htmlfile-edit/htmlfile-edit.component';
import { HtmlFileViewComponent } from './components/files/htmlfile/htmlfile-view/htmlfile-view.component';
import { ComponentNameFilterPipe } from './pipes/component-name-filter.pipe';
import { FriendsComponent } from './components/friends/friends.component';
import { SharedComponentListComponent } from './components/sharedcomponent/sharedcomponent-list/sharedcomponent-list.component';
import { ShareComponentComponent } from './components/sharecomponent/sharecomponent.component';
import { UnShareComponentComponent } from './components/unsharecomponent/unsharecomponent.component';
import { Top10UserFilesComponent } from './components/reports/top10morefiles/top10userfiles.component';
import { ModificationsByUserComponent } from './components/reports/modificationsbyuser/modificationsbyuser.component';
import { ModificationsOverFoldersComponent } from './components/reports/modificationsoverfolders/modificationsoverfolders.component';
import { ImportDataComponent } from './components/importer/importdata/importdata.component';
import { ImportFromFileComponent } from './components/importer/importfromfile/importfromfile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MasterPageComponent,
    UserListComponent,
    UserEditComponent,
    NotFoundComponent,
    ForbiddenComponent,
    GenericTreeComponent,
    UserNameFilterPipe,
    FolderListComponent,
    ComponentNameFilterPipe,
    FolderEditComponent,
    HomeComponent,
    TextFileListComponent,
    TextFileEditComponent,
    TextFileViewComponent,
    HtmlFileListComponent,
    HtmlFileEditComponent,
    HtmlFileViewComponent,
    SharedComponentListComponent,
    FriendsComponent,
    ShareComponentComponent,
    UnShareComponentComponent,
    Top10UserFilesComponent,
    ModificationsByUserComponent,
    ModificationsOverFoldersComponent,
    ImportDataComponent,
    ImportFromFileComponent
    
 
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    TreeViewModule 

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
