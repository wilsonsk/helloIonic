import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { QuotesPage } from '../quotes';

import { Quote } from '../data/quote.interface';
import quotesData from '../data/quotes';

@IonicPage()
@Component({
  selector: 'page-library',
  templateUrl: 'library.html',
})
export class LibraryPage implements OnInit {
  quotesPage = QuotesPage;

  quoteCollection: {category:string, quotes: Quote[], icon:string}[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.quoteCollection = quotesData;
  }

  cb() {
    alert('clicked');
  }

}
