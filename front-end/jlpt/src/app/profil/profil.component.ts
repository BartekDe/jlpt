import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { ProfilModel } from '../models/ProfilModel';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  editForm: any;
  tempArray: any;

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {
    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
}

  ngOnInit() {
    this.httpClient.get('http://localhost:8080/users').subscribe(
      (data) => {
        console.log(data);
        this.tempArray = data;
        return data;
      },
      () => {
      }
    );
  }

  changeUsername() {
    const profilModel: ProfilModel = {
      username: this.editForm.value.username,
      password: ''
    };
    console.log(this.tempArray.map(function(e) { return e.username; }));
    console.log(this.editForm.value.username);
    if(this.editForm.value.username !== '')
    {
      if(this.tempArray.map(function(e) { return e.username; }).indexOf(this.editForm.value.username) == -1 )
      {
        this.authService.changeUsername(profilModel).subscribe(
          () => { console.log(profilModel); },
          () => { console.log(profilModel); }
          );
      }
      else alert('NAZWA ZAJĘTA');
    }
  }

  changePassword() {
    const profilModel: ProfilModel = {
      username: '',
      password: this.editForm.value.password
    };
    if(this.editForm.value.password !== '')
    {
      this.authService.changePassword(profilModel).subscribe(
        () => { console.log(profilModel); },
        () => { console.log(profilModel); }
        );
    }
  }

  deleteAccount() {
    this.authService.deleteAccount().subscribe(
      () => { this.router.navigate(['/']); },
      () => {}
    );
  }

}
