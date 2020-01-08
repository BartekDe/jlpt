import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import { ProfilModel } from '../models/ProfilModel';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  editForm: any;

  constructor(private formBuilder: FormBuilder,
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
      () => { console.log('BOOBS'); console.log(profilModel); },
      () => { console.log('DUPA'); console.log(profilModel); });
  }

  changePassword() {
    alert('HASŁO UŻYTKOWNIKA ZOSTAŁO ZMIENIONE');
  }

  deleteAccount() {
    alert('KONTO ZOSTAŁO USUNIĘTE');
  }

}
