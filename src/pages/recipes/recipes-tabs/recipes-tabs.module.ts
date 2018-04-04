import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipesTabsPage } from './recipes-tabs';

@NgModule({
  declarations: [
    RecipesTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipesTabsPage),
  ],
})
export class RecipesTabsPageModule {}
