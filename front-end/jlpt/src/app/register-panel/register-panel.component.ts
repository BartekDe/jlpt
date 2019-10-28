import { Component } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {RegisterModel} from '../models/RegisterModel';
import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-register-panel',
  templateUrl: './register-panel.component.html',
  styleUrls: ['./register-panel.component.css']
})
export class RegisterPanelComponent {

  private invalid = false;
  usernamePattern = '^([A-Za-z0-9]){4,16}$';
  passwordPattern = '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]){8,20}$';
  emailPattern = '^[A-Zaa-z0-9._%+-]+@[A-Zaa-z0-9.-]+\.[A-Zaa-z]{2,4}$';

  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.pattern(this.usernamePattern)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    repeatPassword: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
  }, {
    validator: PasswordValidation.MatchPassword
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  get f() { return this.registerForm.controls; }
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get repeatPassword() { return this.registerForm.get('repeatPassword'); }
  get email() { return this.registerForm.get('email'); }

  register() {
    const registerModel: RegisterModel = {
      username: this.f.username.value,
      password: this.f.password.value,
      email: this.f.email.value,
    };
    this.authService.registerUser(registerModel).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      () => {
        this.invalid = true;
        alert('NIEPOPRAWNE DANE REJESTRACJI\n' +
          `USERNAME:      ${this.registerForm.value.username}\n` +
          `PASSWORD:      ${this.registerForm.value.password}\n` +
          `PASSWORD:      ${this.registerForm.value.repeatPassword}\n` +
          `EMAIL:         ${this.registerForm.value.email}`);
      }
    );
  }
}
