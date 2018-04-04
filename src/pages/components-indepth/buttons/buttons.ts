import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-buttons',
  templateUrl: 'buttons.html',
})
export class ButtonsPage {
  isPadding = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onClick() {
    console.log('clicked');
  }

  onTogglePadding() {
    this.isPadding = !this.isPadding;
  }

}
