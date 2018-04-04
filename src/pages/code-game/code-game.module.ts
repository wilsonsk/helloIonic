import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodeGamePage } from './code-game';

@NgModule({
  declarations: [
    CodeGamePage,
  ],
  imports: [
    IonicPageModule.forChild(CodeGamePage),
  ],
})
export class CodeGamePageModule {}
