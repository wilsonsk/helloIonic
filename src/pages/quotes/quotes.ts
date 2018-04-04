import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Quote } from './data/quote.interface';

import { FavoritesService } from '../../services/favorites';

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
  quoteGroup: {category:string, quotes: Quote[], icon:string}[];;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private favoritesService: FavoritesService) {

  }

  ionViewWillLoad() {
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavorites(selectedQuote:Quote) {
    const alert = this.alertCtrl.create({
        title: 'Add Quote',
        subTitle: 'Are you sure?',
        message: 'Are you sure you want to add the quote to favorites?',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.favoritesService.addQuoteToFavorites(selectedQuote);
            }
          },
          {
            text: 'Nevermind',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
    });
    alert.present();
  }

  isFavorite(quote: Quote) {
    return this.favoritesService.isQuoteFavorite(quote);
  }

  onRemoveFromFavorites(quote: Quote) {
    this.favoritesService.removeQuoteFromFavorites(quote);
  }

}
