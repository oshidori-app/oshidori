import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InputKeepButtonComponent } from './input-keep-button/input-keep-button';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { InputTaskButtonComponent } from './input-task-button/input-task-button';
import { DevButtonComponent } from './dev-button/dev-button';
import { SkeletonItemComponent } from './skeleton-item/skeleton-item';
@NgModule({
  declarations: [
    InputKeepButtonComponent,
    InputTaskButtonComponent,
    DevButtonComponent,
    SkeletonItemComponent,
  ],
  imports: [IonicModule],
  exports: [
    InputKeepButtonComponent,
    InputTaskButtonComponent,
    DevButtonComponent,
    SkeletonItemComponent,
  ],
  providers: [PhotoLibrary],
})
export class ComponentsModule {}
