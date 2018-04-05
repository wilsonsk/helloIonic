import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Recipe } from '../pages/recipes/models/recipe.interface';
import { Ingredient } from '../pages/recipes/models/ingredient.interface';

import { AuthService } from './auth';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];

  constructor(private http: Http, private authService: AuthService) {}

  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    console.log(this.recipes);
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  saveList(token: string) {
    const userId = this.authService.getCurrentUser().uid;
    return this.http
      .put('https://ionic-recipes-app.firebaseio.com/' + userId + '/recipes.json?auth=' + token,this.recipes)
      .map((response: Response) => {
        return response.json();
      })
  }

  getList(token: string) {
    const userId = this.authService.getCurrentUser().uid;
    return this.http
      .get('https://ionic-recipes-app.firebaseio.com/' + userId + '/recipes.json?auth=' + token)
      .map((response: Response) => {
        const recipes: Recipe[] = response.json() ? response.json() : [];
        for(let recipe of recipes) {
          if(!recipe.hasOwnProperty('ingredients')) {
            recipe.ingredients = [];
          }
        }
        return recipes;
      })
      .do((data) => {
        this.recipes = data;
      });
  }

}
