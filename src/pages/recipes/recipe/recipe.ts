import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Recipe } from '../models/recipe.interface';
import { RecipesService } from '../../../services/recipes';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
  recipe: Recipe;

  ngOnInit() {
    let index = this.navParams.get('index');
    this.onLoadRecipe(index);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private recipesSerivce: RecipesService) {
  }

  onLoadRecipe(index: number) {
    this.recipe = this.recipesSerivce.getRecipe(index);
  }

}
