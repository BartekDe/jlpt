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
    console.log('dupsko');

    const registerModel: RegisterModel = {
      username: this.f.username.value,
      password: this.f.password.value,
      repeatPassword: this.f.repeatPassword.value,
      email: this.f.email.value,
    };
    console.log(registerModel);
    this.authService.registerUser(registerModel).subscribe();
  }

  ngOnInit() {
  }

}
