import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PopoverController, LoadingController, AlertController } from 'ionic-angular';

import { ShoppingListService } from '../../../services/shopping-list';
import { AuthService } from '../../../services/auth';

import { Ingredient } from '../models/ingredient.interface';

import { ShoppingListOptionsPage } from './shopping-list-options/shopping-list-options';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ingredients: Ingredient[] =  [];

  constructor(private shoppingListService: ShoppingListService, private popoverCtrl: PopoverController, private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {}

  private loadIngredients() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  private handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: "Error Occurred",
      message: errorMessage,
      buttons: ['OK']
    });
    alert.present();
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

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Loading Shopping List...'
    });
    const saving = this.loadingCtrl.create({
      content: 'Saving Shopping List...'
    });
    const popover = this.popoverCtrl.create(ShoppingListOptionsPage);
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
              this.shoppingListService.getList(token)
                .subscribe((list: Ingredient[]) => {
                  loading.dismiss();
                  if(list) {
                    this.ingredients = list;
                  } else {
                    this.ingredients = [];
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
              this.shoppingListService.saveList(token)
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
