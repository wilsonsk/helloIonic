import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { QuotePage } from '../quote/quote';

import { Quote } from '../data/quote.interface';

import { FavoritesService } from '../../../services/favorites';
import { SettingsService } from '../../../services/settings';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private favoritesService: FavoritesService, private modalCtrl: ModalController, private settingsService: SettingsService) {
  }

  ionViewWillEnter() {
    this.quotes = this.favoritesService.getFavoriteQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present();
    modal.onDidDismiss((data: boolean) => {
      if(data) {
        this.onRemoveFromFavorites(quote);
      }
    });
  }

  onRemoveFromFavorites(quote: Quote) {
    this.favoritesService.removeQuoteFromFavorites(quote);
    // To re render page
    // this.quotes = this.favoritesService.getFavoriteQuotes();
    //ALT to re render
    const position = this.quotes.findIndex((e: Quote) => {
      return e.id == quote.id;
    })
    this.quotes.splice(position, 1);
  }

  getBackground() {
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }

  isAltBackground() {
    return this.settingsService.isAltBackground();
  }

}
