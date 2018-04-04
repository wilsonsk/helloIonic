import { Component } from '@angular/core';

import { NgForm } from 'ionic-angular';

import { ShoppingListService } from '../../../services/shopping-list';

import { Ingredient } from '../models/ingredient.interface';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ingredients: Ingredient[] =  [];

  constructor(private shoppingListService: ShoppingListService) {}

  private loadIngredients() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  ionViewWillEnter() {
    this.loadIngredients();
  }

  onAddIngredient(form: NgForm) {
    this.shoppingListService.addIngredient(form.value.ingredientName, form.value.ingredientQuantity);
    form.reset;
    this.loadIngredients();
  }

  // onRemoveIngredient(index: number) {
  //   this.shoppingListService.remove(index);
  //   this.loadIngredients();
  // }

  onRemoveIngredient(ingredient: Ingredient) {
    var index = this.ingredients.indexOf(ingredient);
    this.shoppingListService.remove(index);
    this.loadIngredients();
  }

}
