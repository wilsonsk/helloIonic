import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AddPlacePage } from './add-place/add-place';

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  addPlacePage = AddPlacePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
