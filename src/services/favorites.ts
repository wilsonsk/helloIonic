import { Quote } from '../pages/quotes/data/quote.interface';

export class FavoritesService {
  private favoriteQuotes: Quote[] = [];

  addQuoteToFavorites(quote: Quote) {
    this.favoriteQuotes.push(quote);
    console.log(this.getFavoriteQuotes())
  }

  removeQuoteFromFavorites(quote: Quote) {
    const position = this.favoriteQuotes.findIndex((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });
    this.favoriteQuotes.splice(position, 1);
  }

  getFavoriteQuotes() {
    return this.favoriteQuotes.slice();
  }

  isQuoteFavorite(quote: Quote) {
    return this.favoriteQuotes.find((quoteEl: Quote) => {
      return quoteEl.id == quote.id;
    });
  }
}
