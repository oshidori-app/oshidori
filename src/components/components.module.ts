import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InputKeepButtonComponent } from './input-keep-button/input-keep-button';
import { PhotoLibrary } from '@ionic-native/photo-library';
@NgModule({
	declarations: [InputKeepButtonComponent],
	imports: [IonicModule],
	exports: [InputKeepButtonComponent],
	providers: [PhotoLibrary]
})
export class ComponentsModule {}
