import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ComponentsModule } from '../../components/components.module';
import { IonicImageLoader } from 'ionic-image-loader';
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
