import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PanelPage } from './panel';

@NgModule({
  declarations: [
    PanelPage,
  ],
  imports: [
    IonicPageModule.forChild(PanelPage),
  ],
})
export class PanelPageModule {}
