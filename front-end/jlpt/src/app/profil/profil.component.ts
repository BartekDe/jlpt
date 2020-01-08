import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

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
    /*alert('NAZWA UŻYTKOWNIKA ZOSTAŁA ZMIENIONA');*/
    alert('PODANA NAZWA UŻYTKOWNIKA JEST ZAJĘTA');
  }

  changePassword() {
    alert('HASŁO UŻYTKOWNIKA ZOSTAŁO ZMIENIONE');
  }

  deleteAccount() {
    alert('KONTO ZOSTAŁO USUNIĘTE');
  }

}
