import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Ingredient } from '../pages/recipes/models/ingredient.interface';

import { AuthService } from './auth';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  constructor(private http: Http, private authService: AuthService) {
  }

  addIngredient(name:string, quantity: number) {
    this.ingredients.push(new Ingredient(name, quantity));
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  remove(index: number) {
    this.ingredients.splice(index, 1);
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  saveList(token: string) {
    const userId = this.authService.getCurrentUser().uid;
    return this.http
      .put('https://ionic-recipes-app.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token,this.ingredients)
      .map((response: Response) => {
        return response.json();
      })
  }

  getList(token: string) {
    const userId = this.authService.getCurrentUser().uid;
    return this.http
      .get('https://ionic-recipes-app.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
      .map((response: Response) => {
        return response.json();
      })
      .do((data) => {
        this.ingredients = data;
      });
  }

}
