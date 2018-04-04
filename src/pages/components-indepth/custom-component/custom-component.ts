import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-custom-component',
  templateUrl: 'custom-component.html',
})
export class CustomComponentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
