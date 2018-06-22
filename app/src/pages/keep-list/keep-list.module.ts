import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeepListPage } from './keep-list';

@NgModule({
  declarations: [
    KeepListPage,
  ],
  imports: [
    IonicPageModule.forChild(KeepListPage),
  ],
})
export class KeepListPageModule {}
