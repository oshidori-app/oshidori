import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeepPage } from './keep';

@NgModule({
  declarations: [
    KeepPage,
  ],
  imports: [
    IonicPageModule.forChild(KeepPage),
  ],
})
export class KeepPageModule {}
