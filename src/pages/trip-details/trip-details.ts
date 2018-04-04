import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-trip-details',
  templateUrl: 'trip-details.html',
})
export class TripDetailsPage {
  tripDetails: {name:any, address:any};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tripDetails = this.navParams.data;
  }

}
