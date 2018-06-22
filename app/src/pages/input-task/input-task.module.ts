import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InputTaskPage } from './input-task';

@NgModule({
  declarations: [
    InputTaskPage,
  ],
  imports: [
    IonicPageModule.forChild(InputTaskPage),
  ],
})
export class InputTaskPageModule {}
