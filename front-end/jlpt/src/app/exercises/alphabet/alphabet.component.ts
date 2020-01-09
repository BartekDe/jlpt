import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../auth.service';
import {hiragana, katakana, kanji} from './alphabets';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent implements OnInit {

  alphabet = 'APLHABET';
  translateRomaji = '-';
  translateAlphabet = '';
  mode = 'Praktyka';
  modeLabel = 'Sprawdzian';
  findRomaji = '';
  score = 0;
  attempts = 0;
  percent = '0%';
  last = '';
  kana = katakana;
  color = 'btn-danger';
  sub;
  onReading = '';
  kunReading = '';

  constructor(private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.sub = this.route.data.subscribe(
        v => (
          console.log(v),
          this.alphabet = v.kana,
          this.kana = v.kana === 'Katakana' ? katakana : v.kana === 'Hiragana' ? hiragana : kanji)
      );
  }

  selectSign(i, j) {
    this.translateRomaji = this.kana[i][j][1];
    this.translateAlphabet = this.kana[i][j][0];
    if (this.alphabet === 'Kanji') {
      this.onReading = this.kana[i][j][2];
      this.kunReading = this.kana[i][j][3];
    }

    if (this.mode === 'Sprawdzian') {
      if (this.translateRomaji === this.findRomaji) {
        this.score ++;
        this.authService.sendAlphabetScore(localStorage.getItem('lessonID')).subscribe(
          () => { console.log(localStorage.getItem('lessonID')); },
          () => { console.log(localStorage.getItem('lessonID') + ' FAIL'); }
        );
        this.last = 'Dobrze';
      } else {
        this.last = 'Pomyłka';
      }
      this.attempts ++;
      this.percent = Math.floor((this.score / this.attempts) * 100) + '%';
      this.randomSign();
    }
  }

  changeMode() {
    if (this.mode === 'Praktyka') {
      this.mode = 'Sprawdzian';
      this.modeLabel = 'Praktyka';
      this.score = 0;
      this.attempts = 0;
      this.percent = '0%';
      this.last = '';
      this.randomSign();
    } else {this.mode = 'Praktyka'; this.modeLabel = 'Sprawdzian'; }
  }

  randomSign() {
    let col;
    let row = Math.floor(Math.random() * 14);
    if (row > 7) { row = row + 1; }
    if (row === 14) {
      col = Math.floor(Math.random() * 3);
    } else {
      col = Math.floor(Math.random() * 8);
      if (col > 4) { col = col + 1; }
    }
    this.findRomaji = this.kana[row][col][1];
  }
}
