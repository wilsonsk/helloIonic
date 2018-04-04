import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ButtonsPage } from './buttons/buttons';
import { ListsPage } from './lists/lists';
import { GridsPage } from './grids/grids';
import { GesturesPage } from './gestures/gestures';
import { CustomComponentPage } from './custom-component/custom-component';

@IonicPage()
@Component({
  selector: 'page-components-indepth',
  templateUrl: 'components-indepth.html',
})
export class ComponentsIndepthPage {
  buttonsPage = ButtonsPage;
  listsPage = ListsPage;
  gridsPage = GridsPage;
  gesturesPage = GesturesPage;
  customComponentPage = CustomComponentPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
