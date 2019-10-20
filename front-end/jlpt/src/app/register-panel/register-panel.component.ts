import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {RegisterModel} from '../models/RegisterModel';

@Component({
  selector: 'app-register-panel',
  templateUrl: './register-panel.component.html',
  styleUrls: ['./register-panel.component.css']
})
export class RegisterPanelComponent implements OnInit {
  private submitted = false;
  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    repeatPassword: ['', Validators.required],
    email: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private httpClient: HttpClient) { }

  get f() {
    return this.registerForm.controls;
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const registerModel: RegisterModel = {
      username: this.f.username.value,
      password: this.f.password.value,
      repeatPassword: this.f.repeatPassword.value,
      email: this.f.email.value,
      accessToken: this.authService.getToken()
    };
    this.authService.registerUser(registerModel);
    /*
    // this.router.navigate(['/']);
    console.log('I DID IT FRONT');
    console.log(registerForm);
    return this.httpClient.post('http://localhost:8080/auth/register', registerForm);
    // this.router.navigate(['/'])*/
  }

  login() {
    this.router.navigate(['/']);
  }

  ngOnInit() {
  }

}
