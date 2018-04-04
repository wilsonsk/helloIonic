import { Component } from '@angular/core';
import { LoginPage } from '../login/login';
import { TabsPage } from '../quotes/tabs/tabs';
import { ComponentsIndepthPage } from '../components-indepth/components-indepth';
import { CodeGamePage } from '../code-game/code-game';
import { RecipesTabsPage } from '../recipes/recipes-tabs/recipes-tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginPage = LoginPage;
  tabsPage = TabsPage;
  componentsIndepthPage = ComponentsIndepthPage;
  codeGamePage = CodeGamePage;
  recipesTabsPage = RecipesTabsPage;
}
