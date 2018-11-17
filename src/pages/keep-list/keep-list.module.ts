import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KeepListPage } from './keep-list';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    KeepListPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(KeepListPage),
  ],
})
export class KeepListPageModule {}
