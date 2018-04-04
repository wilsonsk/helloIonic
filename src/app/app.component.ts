import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/quotes/tabs/tabs';
import { SettingsPage } from '../pages/quotes/settings/settings';
import { ComponentsIndepthPage } from '../pages/components-indepth/components-indepth';
import { CodeGamePage } from '../pages/code-game/code-game';
import { RecipesTabsPage } from '../pages/recipes/recipes-tabs/recipes-tabs';
import { SigninPage } from '../pages/recipes/signin/signin';
import { SignupPage } from '../pages/recipes/signup/signup';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  homePage = HomePage;
  tabsPage = TabsPage;
  settingsPage = SettingsPage;
  componentsIndepthPage = ComponentsIndepthPage;
  codeGamePage = CodeGamePage;
  recipesTabsPage = RecipesTabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;

  @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {

  }

}
