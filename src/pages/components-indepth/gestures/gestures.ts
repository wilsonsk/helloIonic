import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-gestures',
  templateUrl: 'gestures.html',
})
export class GesturesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onClick() {
    console.log('clicked/touched');
  }

  onTap() {
    console.log('tapped');
  }

  onPress() {
    console.log('pressed');
  }
}
