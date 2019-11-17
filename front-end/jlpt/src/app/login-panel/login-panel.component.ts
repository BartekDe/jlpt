import { Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent {
  loginForm: any;
  invalid = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
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
    this.authService.login(loginModel).subscribe(
      (data) => {
        this.invalid = false;
        /* tslint:disable:no-string-literal */
        this.authService.saveToken(data['token']);
        this.authService.getRole();
        this.authService.role = 'Admin'; // data['role'];

        this.router.navigate(['/profil']);
        /* tslint:enable:no-string-literal */
      },
      () => {
        this.invalid = true;
        alert('NIEPOPRAWNE DANE LOGOWANIA\n' +
          `USERNAME:      ${this.loginForm.value.username}\n` +
          `PASSWORD:      ${this.loginForm.value.password}`);
      }
    );
  }
}
