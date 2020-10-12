import { Component, Input, NgModule, OnInit, ɵConsole } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../services/login.service';
import { environment } from 'src/environments/environment';
import { LoginUser } from 'src/app/intefaces/LoginUser';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

@NgModule({
  imports: [
    FormsModule
  ],


})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  submitted = false
  loginToken: string
  errorMessage: string
  loginInfo: LoginUser

  constructor(private loginService: LoginService, private cookieService: CookieService, private routerService: Router,
    private titleService: Title, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.setTitle("TwoDrive");
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    } else {
      this.login();
    }
  }

  login(): void {
    this.loginInfo = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }


    this.loginService.login(this.loginInfo).subscribe(
      ((data: any) => this.putTokenOnCookie(data)),
      ((error: any) => this.getErrorMessage(error))
    )
  }

  getErrorMessage(error: string): void {
    this.errorMessage = error;
  }

  putTokenOnCookie(data: string): void {
    this.loginToken = data;
    this.cookieService.set(environment.IDToken, this.loginToken);
    this.routerService.navigate(['/home']);
  }


  public setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }
}





