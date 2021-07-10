import { TokenStorageService } from './../auth/token-storage.service';
import { AuthService } from './../auth/auth.service';
import { LoginInfo } from './../models/login-info';
import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginFormGroup: FormGroup;
  isLoggedIn = false;
  public loginInfo: LoginInfo;
  public form = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  };
  constructor(
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private Jarwis: AuthService,
    private tokenStorage: TokenStorageService,
    private snotifyService: ToastrService
  ) { }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#fff';
  }
  reloadPage() {
    window.location.reload();
  }
  handleData(data) {
    console.log(data);
    this.tokenStorage.saveToken(data.accessToken);
    this.tokenStorage.saveEmail(data.email);
    this.isLoggedIn = true;
    this.reloadPage();
    this.snotifyService.clear();
    this.snotifyService.success('Welcome ' + data.name, '', {
      timeOut: 500,
      closeButton: true,
    });
  }
  handleError(error) {
    console.log(error.error.reason);
    this.snotifyService.clear();
    this.snotifyService.error(error.error.reason, '', {
      timeOut: 0,
      closeButton: true,
    });
  }
  onSubmit() {



    if (this.loginFormGroup.invalid) {
        return;
    }
    this.snotifyService.clear();
    this.snotifyService.info('Please Wait...', '', {
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'increasing',
    });
    this.loginInfo = new LoginInfo(this.form.email.value, this.form.password.value);

    this.Jarwis.attemptAuth(this.loginInfo).subscribe(
      data => this.handleData(data),
      error => this.handleError(error)
    );

  }
  ngOnInit() {

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }

    this.createForm();
  }

  getEmailError() {
    return this.form.email.hasError('required') ? 'You must enter your Email Address' :
        this.form.email.hasError('email') ? 'You must enter Valid Email Address' : '';
  }
  getPasswordError() {
    return this.form.password.hasError('required') ? 'You must enter your Password' : '';
  }
  createForm() {
    this.loginFormGroup = this.fb.group(this.form);
  }

}
