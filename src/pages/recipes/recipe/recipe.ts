import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Recipe } from '../models/recipe.interface';
import { RecipesService } from '../../../services/recipes';
import { ShoppingListService } from '../../../services/shopping-list';

import { ManageRecipePage } from '../manage-recipe/manage-recipe';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
  recipe: Recipe;
  index: number;

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.onLoadRecipe(this.index);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private recipesSerivce: RecipesService,
              private shoppingListService: ShoppingListService) {
  }

  onLoadRecipe(index: number) {
    this.recipe = this.recipesSerivce.getRecipe(index);
  }

  onAddToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.navCtrl.push(ManageRecipePage, {mode: 'Edit', index: this.index})
  }

  onDeleteRecipe() {
    this.recipesSerivce.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
