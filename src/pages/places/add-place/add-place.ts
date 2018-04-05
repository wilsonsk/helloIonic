import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { SetLocationPage } from '../set-location/set-location';

import { Location } from '../models/location.interface';

import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  }
  locationIsSet = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController, private geolocation: Geolocation) {
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss((data) => {
      if(data){
        this.location = data.location;
        this.locationIsSet = true;
      }
    });
  }

  onLocateMe() {
    this.geolocation.getCurrentPosition()
      .then((location) => {
        console.log(location)
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.locationIsSet = true;
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
