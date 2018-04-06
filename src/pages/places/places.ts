import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavParams } from 'ionic-angular';

import { AddPlacePage } from './add-place/add-place';
import { PlacePage } from './place/place';
import { Place } from './models/place.interface';

import { PlacesService } from '../../services/places';

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage implements OnInit {
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(private modalCtrl: ModalController, public navParams: NavParams, private placesService: PlacesService) {
  }

  ngOnInit() {
    this.onFetchPlaces();
  }

  ionViewWillEnter() {
    this.onLoadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
    modal.onDidDismiss((data) => {
      this.onFetchPlaces();
    });
  }

  onFetchPlaces() {
    this.placesService.fetchPlacesFromStorage()
      .then((places: Place[]) => {
        this.places = places;
      });
  }

  onLoadPlaces() {
    this.places = this.placesService.loadPlaces();
  }

}
