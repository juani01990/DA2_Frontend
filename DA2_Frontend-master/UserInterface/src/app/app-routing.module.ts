import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MasterPageComponent } from './components/master-page/master-page.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { MasterPageGuard } from './guards/masterpage.guard';
import { UserGuard } from './guards/user.guard';
import { GenericTreeComponent } from './components/generictree/generictree.component';
import { MyfilesGuard } from './guards/myfiles.guard';
import { FolderListComponent } from './components/folder/folder-list/folder-list.component';
import { FolderGuard } from './guards/folder.guard';
import { FolderEditComponent } from './components/folder/folder-edit/folder-edit.component';
import { HomeComponent } from './components/home/home.component';
import { HomeGuard } from './guards/home.guard';
import { TextFileListComponent } from './components/files/textfile/textfile-list/textfile-list.component';
import { FileGuard } from './guards/file.guard';
import { TextFileEditComponent } from './components/files/textfile/textfile-edit/textfile-edit.component';
import { TextFileViewComponent } from './components/files/textfile/textfile-view/textfile-view.component';
import { HtmlFileListComponent } from './components/files/htmlfile/htmlfile-list/htmlfile-list.component';
import { HtmlFileEditComponent } from './components/files/htmlfile/htmlfile-edit/htmlfile-edit.component';
import { HtmlFileViewComponent } from './components/files/htmlfile/htmlfile-view/htmlfile-view.component';
import { SharedComponentListComponent } from './components/sharedcomponent/sharedcomponent-list/sharedcomponent-list.component';
import { ShareComponentGuard } from './guards/sharedcomponent.guard';
import { FriendsGuard } from './guards/friends.guard';
import { ShareComponentComponent } from './components/sharecomponent/sharecomponent.component';
import { UnShareComponentComponent } from './components/unsharecomponent/unsharecomponent.component';
import { FriendsComponent } from './components/friends/friends.component';
import { Top10UserFilesComponent} from './components/reports/top10morefiles/top10userfiles.component';
import { ReportsGuard } from './guards/reports.guard';
import { ModificationsByUserComponent } from './components/reports/modificationsbyuser/modificationsbyuser.component';
import { ModificationsOverFoldersComponent } from './components/reports/modificationsoverfolders/modificationsoverfolders.component';
import { ImporterGuard } from './guards/importer.guard';
import { ImportDataComponent } from './components/importer/importdata/importdata.component';
import { ImportFromFileComponent } from './components/importer/importfromfile/importfromfile.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'masterpage', component: MasterPageComponent, canActivate: [MasterPageGuard] },
  { path: 'userlist', component: UserListComponent, canActivate: [UserGuard] },
  { path: 'user/:id', component: UserEditComponent, canActivate: [UserGuard] },
  { path: 'user', component: UserEditComponent, canActivate: [UserGuard] },
  { path: 'myfiles', component: GenericTreeComponent, canActivate: [MyfilesGuard] },
  { path: 'folderlist', component: FolderListComponent, canActivate: [FolderGuard]},
  { path: 'folder/:id', component: FolderEditComponent, canActivate: [FolderGuard]},
  { path: 'folder', component: FolderEditComponent, canActivate: [FolderGuard]},
  { path: 'home', component: HomeComponent, canActivate: [HomeGuard]},
  { path: 'textfilelist', component: TextFileListComponent, canActivate: [FileGuard]},
  { path: 'textfile/:id', component: TextFileEditComponent, canActivate: [FileGuard]},
  { path: 'textfile', component: TextFileEditComponent, canActivate: [FileGuard]},
  { path: 'textfileview/:id/:loggeduserid', component: TextFileViewComponent, canActivate: [FileGuard]},
  { path: 'htmlfilelist', component: HtmlFileListComponent, canActivate: [FileGuard]},
  { path: 'htmlfile/:id', component: HtmlFileEditComponent, canActivate: [FileGuard]},
  { path: 'htmlfile', component: HtmlFileEditComponent, canActivate: [FileGuard]},
  { path: 'htmlfileview/:id', component: HtmlFileViewComponent, canActivate: [FileGuard]},
  { path: 'sharedcomponentlist', component: SharedComponentListComponent, canActivate: [ShareComponentGuard]},
  { path: 'friendsList', component: FriendsComponent, canActivate: [FriendsGuard]},
  { path: 'sharecomponent/:id', component: ShareComponentComponent, canActivate: [ShareComponentGuard]},
  { path: 'unsharecomponent/:id/:friendusername/:loggeduserid', component: UnShareComponentComponent, canActivate: [ShareComponentGuard]},
  { path: 'top10report', component: Top10UserFilesComponent, canActivate: [ReportsGuard]},
  { path: 'modificationsbyuser', component: ModificationsByUserComponent, canActivate: [ReportsGuard]},
  { path: 'modificationsoverfolders', component: ModificationsOverFoldersComponent, canActivate: [ReportsGuard]},
  { path: 'importer', component: ImportDataComponent, canActivate: [ImporterGuard]},
  { path: 'importfromfile/:selectedImporter', component: ImportFromFileComponent, canActivate: [ImporterGuard]},

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/notfound', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

