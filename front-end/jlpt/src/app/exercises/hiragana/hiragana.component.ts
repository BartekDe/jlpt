import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hiragana',
  templateUrl: './hiragana.component.html',
  styleUrls: ['./hiragana.component.css']
})
export class HiraganaComponent {

  hiragana = [
    [['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o'], [], ['や ', 'ya'], ['ゆ ', 'yu'], ['よ ', 'yo']],
    [['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko'], [], ['きゃ', 'kya'], ['きゅ', 'kyu'], ['きょ', 'kyo']],
    [['さ', 'sa'], ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so'], [], ['しゃ', 'sha'], ['しゅ', 'shu'], ['しょ', 'sho']],
    [['た', 'ta'], ['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to'], [], ['ちゃ', 'cha'], ['ちゅ', 'chu'], ['ちょ', 'cho']],
    [['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no'], [], ['にゃ', 'nya'], ['にゅ', 'nyu'], ['にょ', 'nyo']],
    [['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho'], [], ['ひゃ', 'hya'], ['ひゅ', 'hyu'], ['ひょ', 'hyo']],
    [['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo'], [], ['みゃ', 'mya'], ['みゅ', 'myu'], ['みょ', 'myo']],
    [['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro'], [], ['りゃ', 'rya'], ['りゅ', 'ryu'], ['りょ', 'ryo']],
    [[]],
    [['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go'], [], ['ぎゃ', 'gya'], ['ぎゅ', 'gyu'], ['ぎょ', 'gyo']],
    [['ざ', 'za'], ['じ', 'ji'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo'], [], ['じゃ', 'ja'], ['じゅ', 'ju'], ['じょ', 'jo']],
    [['だ', 'da'], ['ぢ', '(ji)'], ['づ', '(zu)'], ['で', 'de'], ['ど', 'do'], [], ['ぢゃ', '(ja)'], ['ぢゅ', '(ju)'], ['ぢょ', '(jo)']],
    [['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo'], [], ['びゃ', 'bya'], ['びゅ', 'byu'], ['びょ', 'byo']],
    [['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po'], [], ['ぴゃ', 'pya'], ['ぴゅ', 'pyu'], ['ぴょ', 'pyo']],
    [['わ', 'wa'], ['を', 'wo'], ['ん', 'n']]
  ];

  translateRomaji = '-';
  translateHiragana = '';
  mode = 'Praktyka';
  findRomaji = '';
  score = 0;
  attempts = 0;
  percent = '0%';
  last = '';
  kana = this.hiragana;

  constructor() { }

  selectSign(i, j) {
    this.translateRomaji = this.hiragana[i][j][1];
    this.translateHiragana = this.hiragana[i][j][0];

    if (this.mode === 'Sprawdzian') {
      if (this.translateRomaji === this.findRomaji) {
        this.score ++;
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
      this.score = 0;
      this.attempts = 0;
      this.percent = '0%';
      this.last = '';
      this.randomSign();
    } else {this.mode = 'Praktyka'; }
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
    this.findRomaji = this.hiragana[row][col][1];
  }
}
