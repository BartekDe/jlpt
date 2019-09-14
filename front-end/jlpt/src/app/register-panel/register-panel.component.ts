import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-panel',
  templateUrl: './register-panel.component.html',
  styleUrls: ['./register-panel.component.css']
})
export class RegisterPanelComponent implements OnInit {

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    checkPassword: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  register(){
    this.router.navigate(['/profil']);
  }

  ngOnInit() {
  }

}
