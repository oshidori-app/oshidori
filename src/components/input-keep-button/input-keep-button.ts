import { Component, Input, NgModule, ElementRef } from '@angular/core';
import { NavParams, ActionSheetController, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { InputKeepPage } from '../../pages/input-keep/input-keep';
/**
 * Generated class for the InputKeepButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'input-keep-button',
  templateUrl: 'input-keep-button.html'
})
export class InputKeepButtonComponent {
  @Input() task: string;

  public selectedPhoto: Blob;

  constructor(
    public navCtrl: NavController, 
    public actionSheetCtrl: ActionSheetController, 
    private camera: Camera, 
    public photoLibrary: PhotoLibrary)
  {
    console.log(this.task);
  }

  showMenu() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'カメラで撮影する',
          handler: () => {
            // todo this.takePhoto();
            this.navCtrl.push(InputKeepPage, {selectedTask: this.task});
          }
        },{
          text: 'ライブラリから選択する',
          handler: () => {
            // todo this.library();
            this.navCtrl.push(InputKeepPage, {selectedTask: this.task});
          }
        },{
          text: 'キャンセル',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  };

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 200,
      targetWidth: 200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.selectedPhoto  = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
    }, (err) => {
      alert(JSON.stringify(err));
    });
  };

  library(){
    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.getLibrary().subscribe({
        next: library => {
          library.forEach(function(libraryItem) {
            console.log(libraryItem.id);          // ID of the photo
            console.log(libraryItem.photoURL);    // Cross-platform access to photo
            console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
            console.log(libraryItem.fileName);
            console.log(libraryItem.width);
            console.log(libraryItem.height);
            console.log(libraryItem.creationDate);
            console.log(libraryItem.latitude);
            console.log(libraryItem.longitude);
            console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
          });
        },
        error: err => { console.log('could not get photos'); },
        complete: () => { console.log('done getting photos'); }
      });
    })
    .catch(err => {alert(JSON.stringify(err)); console.log('permissions weren\'t granted')});
  };

  dataURItoBlob(dataURI) {
    // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  };
}
