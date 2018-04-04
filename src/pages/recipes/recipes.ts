import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ManageRecipePage } from './manage-recipe/manage-recipe';
import { RecipePage } from './recipe/recipe';

import { Recipe } from './models/recipe.interface';
import { RecipesService } from '../../services/recipes';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(public navCtrl: NavController, private recipesService: RecipesService) {
  }

  onNewRecipe() {
    this.navCtrl.push(ManageRecipePage, {mode: 'New'});
  }

  ionViewWillEnter() {
    this.onLoadRecipe();
  }

  onLoadRecipe() {
    this.recipes = this.recipesService.getRecipes();
  }

  onRemoveRecipe(recipe: Recipe) {
    let index = this.recipes.indexOf(recipe);
    this.recipesService.removeRecipe(index);
    this.onLoadRecipe();
  }

  onGetRecipePage(recipe: Recipe) {
    this.index = this.recipes.indexOf(recipe);
    this.navCtrl.push(RecipePage, {index: this.index});
  }

}
