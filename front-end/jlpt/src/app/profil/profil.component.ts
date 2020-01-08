import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { ProfilModel } from '../models/ProfilModel';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  editForm: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {
    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
}

  ngOnInit() {}

  changeUsername() {
    const profilModel: ProfilModel = {
      username: this.editForm.value.username,
      password: ''
    };
    this.authService.changeUsername(profilModel).subscribe(
      () => { console.log(profilModel); },
      () => { console.log(profilModel); }
      );
  }

  changePassword() {
    const profilModel: ProfilModel = {
      username: '',
      password: this.editForm.value.password
    };
    this.authService.changePassword(profilModel).subscribe(
      () => { console.log(profilModel); },
      () => { console.log(profilModel); }
      );
  }

  deleteAccount() {
    this.authService.deleteAccount().subscribe(
      () => { this.router.navigate(['/']); },
      () => { console.log('Lel'); }
    );
  }

}
