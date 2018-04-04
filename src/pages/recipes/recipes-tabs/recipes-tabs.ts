import { Component } from '@angular/core';

import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RecipesPage } from '../recipes';

@IonicPage()
@Component({
  selector: 'page-recipes-tabs',
  templateUrl: 'recipes-tabs.html',
})
export class RecipesTabsPage {
  shoppingListPage = ShoppingListPage;
  recipesPage = RecipesPage;
}
