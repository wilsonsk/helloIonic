import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Place } from '../models/place.interface';

import { PlacesService } from '../../../services/places';

@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {
  place: Place;
  index: number;

  constructor(public navParams: NavParams, private viewCtrl: ViewController, private placesService: PlacesService) {
      this.place = this.navParams.get('place');
      this.index = this.navParams.get('index');
  }

  onExitModal() {
    this.viewCtrl.dismiss();
  }

  onDeletePlace() {
    this.placesService.deletePlace(this.index);
    this.onExitModal();
  }

}
