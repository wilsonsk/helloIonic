import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FavoritesPage } from '../favorites/favorites';
import { LibraryPage } from '../library/library';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {
  favoritesPage = FavoritesPage;
  libraryPage = LibraryPage;

  constructor(private navCtrl: NavController) {

  }

  goHome() {
    this.navCtrl.pop();
  }
}
