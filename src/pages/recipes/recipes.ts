import { Component } from '@angular/core';
import { PopoverController, NavController, AlertController, LoadingController } from 'ionic-angular';

import { ManageRecipePage } from './manage-recipe/manage-recipe';
import { RecipePage } from './recipe/recipe';

import { Recipe } from './models/recipe.interface';
import { RecipesService } from '../../services/recipes';
import { AuthService } from '../../services/auth';

import { RecipesOptionsPage } from './recipes-options/recipes-options';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  recipes: Recipe[];

  constructor(public navCtrl: NavController, private recipesService: RecipesService, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController, private popoverCtrl: PopoverController, private authService: AuthService) {
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: "Error Occurred",
      message: errorMessage,
      buttons: ['OK']
    });
    alert.present();
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
    let index = this.recipes.indexOf(recipe);
    this.navCtrl.push(RecipePage, {index: index});
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Loading Recipes List...'
    });
    const saving = this.loadingCtrl.create({
      content: 'Saving Recipes List...'
    });
    const popover = this.popoverCtrl.create(RecipesOptionsPage);
    popover.present({ev:event});
    popover.onDidDismiss((data) => {
      if(!data) {
        return;
      }
      switch(data.action) {
        case 'load':
        loading.present();
          this.authService.getCurrentUser().getIdToken()
            .then((token: string) => {
              this.recipesService.getList(token)
                .subscribe((list: Recipe[]) => {
                  loading.dismiss();
                  if(list) {
                    this.recipes = list;
                  } else {
                    this.recipes = [];
                  }
                }, (error) => {
                  loading.dismiss();
                  this.handleError(error.json().message);
                });
            })
            .catch((error) => console.log(error));
          break;
        case 'save':
          saving.present();
          this.authService.getCurrentUser().getIdToken()
            .then((token: string) => {
              this.recipesService.saveList(token)
                .subscribe(() => {
                  saving.dismiss();
                }, (error) => {
                  saving.dismiss();
                  this.handleError(error.json().message);
                });
            })
            .catch((error) => console.log(error));
          break;
      }
    });
  }

}
