import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';

import { ComponentsModule } from '../../components/components.module';

import { HomePage } from './home';
@NgModule({
    declarations: [
        HomePage,
    ],
    imports: [
        ComponentsModule,
        IonicImageLoader,
        IonicPageModule.forChild(HomePage),
    ],
})
export class HomePageModule { }
