import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Recipe } from '../models/recipe.interface';

import { RecipesService } from '../../../services/recipes';

@Component({
  selector: 'page-manage-recipe',
  templateUrl: 'manage-recipe.html',
})
export class ManageRecipePage implements OnInit {
  mode = 'New';
  selectOptions =['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipeIndex: number;
  recipe: Recipe;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetController: ActionSheetController, private alertCtrl: AlertController,
    private toastCtrl: ToastController, private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if(this.mode == 'Edit') {
      this.recipeIndex = this.navParams.get('index');
      this.recipe = this.recipesService.getRecipe(this.recipeIndex);
    }
    this.initializeForm();
  }

  private initializeForm(title=null, description=null,difficulty='Medium',ingredients=[]) {
    if(this.mode == 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }
    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
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
    if(this.mode == 'Edit') {
      this.recipesService.updateRecipe(this.recipeIndex, value.title, value.description, value.difficulty, ingredients);
    } else {
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }
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
