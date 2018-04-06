import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { SetLocationPage } from '../set-location/set-location';

import { Location } from '../models/location.interface';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { File, Entry, FileError } from '@ionic-native/file';

import { PlacesService } from '../../../services/places';

declare var cordova: any;

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
  imageUrl = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private modalCtrl: ModalController, private geolocation: Geolocation,
              private loadingCtrl: LoadingController, private toastCtrl: ToastController,
              private camera: Camera, private placesService: PlacesService, private file: File) {
  }

  onSubmit(form: NgForm) {
      this.placesService.addPlace(form.value.title, form.value.description, this.location, this.imageUrl);
      form.reset();
      this.location = {
        lat: 40.7624324,
        lng: -73.9759827
      };
      this.imageUrl = '';
      this.locationIsSet = false;
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
    const loading = this.loadingCtrl.create({
      content: 'Getting your Location'
    });
    loading.present();

    this.geolocation.getCurrentPosition()
      .then((location) => {
        loading.dismiss();
        console.log(location)
        this.location.lat = location.coords.latitude;
        this.location.lng = location.coords.longitude;
        this.locationIsSet = true;
      })
      .catch((error) => {
          loading.dismiss();
          const toast = this.toastCtrl.create({
              message: 'Could not get your Location',
              duration: 2500,
          });
          toast.present();
      });
  }

  onOpenCamera() {
    this.camera.getPicture({
      correctOrientation: true,
    })
      .then((imageData) => {
        // imageData depends on save destination type
        console.log(imageData);
        const currentName = imageData.replace(/^.*[\\\/]/, '');
        const path = imageData.replace(/[^\/]*$/, '');
        const newFileName = new Date().getUTCMilliseconds() + '.jpg';
        // cordova.file.dataDirectory == folder for this app on the specific platform/device where you can store files permanently
        // File.moveFile(sourcePath, sourceFileName, destinationPath, destinationFileName)
        this.file.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
          .then((data: Entry) => {
            this.imageUrl = data.nativeURL;
          })
          .catch((error: FileError) => {
            this.imageUrl = '';
            const toast = this.toastCtrl.create({
              message: 'Could not save image. Please try again',
              duration: 2500
            });
            toast.present();
            // Cleanup renames each file same name - must set new file name,'newFileName'
            this.camera.cleanup();
            // OR
            // File.removeFile(path, currentName);

          });
        this.imageUrl = imageData;
      })
      .catch((error) => {
        const toast = this.toastCtrl.create({
          message: 'Could not take photo. Please try again',
          duration: 2500
        });
        toast.present();
        this.camera.cleanup();
      });
  }

}
