import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-code-game',
  templateUrl: 'code-game.html',
})
export class CodeGamePage {
  gameStatus: string;
  numTaps = 0;
  numPresses = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onReset(resetType: string) {
    switch(resetType) {
      case 'tap':
        this.numTaps = 0;
        break;
      case 'press':
        this.numPresses = 0;
        break;
      default:
        this.numTaps = 0;
        this.numPresses = 0;
    }
  }

  onTap() {
    this.numTaps += 1;
  }

  onPress() {
    this.numPresses += 1;
  }

  didWin() {
    return this.numTaps == 2 && this.numPresses == 4;
  }

}
