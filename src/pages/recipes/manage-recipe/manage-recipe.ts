import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { RecipesService } from '../../../services/recipes';

@Component({
  selector: 'page-manage-recipe',
  templateUrl: 'manage-recipe.html',
})
export class ManageRecipePage implements OnInit {
  mode: 'New';
  selectOptions =['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetController: ActionSheetController, private alertCtrl: AlertController,
    private toastCtrl: ToastController, private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initializeForm();
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl(this.selectOptions[1], Validators.required),
      'ingredients': new FormArray([])
    });
  }

  onSubmit() {
    // Following 2 lines wont work because we need to obtain a quantity value for recipes with more than one ingredient
    // const recipe = this.recipeForm.value;
    // this.recipesService.addRecipe(recipe.title, recipe.description, recipe.difficulty, recipe.ingredients);

    const value = this.recipeForm.value;
    let ingredients = [];
    if(value.ingredients.length > 0) {
      ingredients = value.ingredients.map((name) => {
        return {name: name, quantity: 1};
      });
    }

    this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title:'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.addNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const formArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = formArray.length;
            if(len > 0) {
              for (let i = len-1; i >= 0; i--) {
                formArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All Ingredients were removed',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private addNewIngredientAlert() {
    const newIngredientAlert = this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'ingredientName',
          placeholder: 'Ingredient Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            if(data.ingredientName.trim() == '' || data.ingredientName == null) {
              const toast = this.toastCtrl.create({
                message: 'Please enter an Ingredient name',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
            } else {
              (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.ingredientName, Validators.required));
              const toast = this.toastCtrl.create({
                message: 'Ingredient Added',
                duration: 1000,
                position: 'top'
              });
              toast.present();
            }
          }
        }
      ]
    });
    return newIngredientAlert;
  }

}
