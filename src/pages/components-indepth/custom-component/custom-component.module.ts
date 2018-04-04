import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomComponentPage } from './custom-component';

@NgModule({
  declarations: [
    CustomComponentPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomComponentPage),
  ],
})
export class CustomComponentPageModule {}
