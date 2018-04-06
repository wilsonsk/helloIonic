import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

import { Place } from '../pages/places/models/place.interface';
import { Location } from '../pages/places/models/location.interface';

declare var cordova: any;

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(private storage: Storage){}

  addPlace(title: string, description: string, location: Location, imageUrl: string) {
    const place = new Place(title, description, location, imageUrl);
    this.places.push(place);
    this.storage.set('places', this.places)
      .then(() => {

      })
      .catch((error) => {
        this.places.splice(this.places.indexOf(place), 1);
        console.log(error);
      });
  }

  loadPlaces() {
    return this.places.slice();
  }

  fetchPlacesFromStorage() {
    return this.storage.get('places')
      .then((places: Place[]) => {
        return this.places = places != null ? places : [];
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    // set() overrides past values
    this.storage.set('places',this.places)
      .then(() => {
        this.removeFile(place);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private removeFile(place: Place) {
    const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
    File.removeFile(cordova.file.dataDirectory, currentName)
      .then(() => {
        console.log('successfully removed file');
      })
      .catch((error) => {
        console.log(error);
        this.addPlace(place.title, place.description, place.location, place.imageUrl);
      });
  }

}
