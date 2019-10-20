import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {
  loginForm: any;
  invalid = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    const loginModel = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    // Data is {accessToken:"..."}
    this.loginService.login(loginModel).subscribe(
      (data) => {
        this.invalid = false;
        /* tslint:disable:no-string-literal */
        this.authService.saveToken(data['accessToken']);
        this.authService.role = data['role'];
        /* tslint:enable:no-string-literal */
      },
      () => {
        this.invalid = true;
      }
    );
  }

  register() {
    this.router.navigate(['/register-panel']);
  }

  ngOnInit() {
  }

}
