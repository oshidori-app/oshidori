import { Component, Input } from '@angular/core';
import { ActionSheetController, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { InputKeepPage } from '../../pages/input-keep/input-keep';
import { StorageService } from '../../providers/storage.service';
import { v4 as uuid } from 'uuid';
import { finalize } from 'rxjs/operators';
import { DisplayUtilService } from '../../providers/display-util.service';
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

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private dutil: DisplayUtilService,
    private storage: StorageService) {
      console.log(this.task);
      }

  showMenu() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'カメラで撮影する',
          handler: () => {
            // revisit: await したい...
            const next = (url) => this.navCtrl.push(InputKeepPage, { selectedTask: this.task, imgUrl: url });
             this.takePhotoAndUpload(next);
          }
        }, {
          text: 'ライブラリから選択する',
          handler: () => {
            const next = (url) => this.navCtrl.push(InputKeepPage, { selectedTask: this.task, imgUrl: url });
            this.getFromLibraryAndUpload(next);
          }
        }, {
          text: 'キャンセル',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  };

  takePhotoAndUpload(callback) {
    this.getAndUpload(this.camera.PictureSourceType.CAMERA, callback);
  }

  getFromLibraryAndUpload(callback) {
    this.getAndUpload(this.camera.PictureSourceType.PHOTOLIBRARY, callback);
  }

  getAndUpload(number, callback) {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 200,
      targetWidth: 200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: number
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      const selectedPhoto = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);

      const fileName = uuid();
      const uploadTask = this.storage.uploadBlob(selectedPhoto, fileName);
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          uploadTask.ref.getDownloadURL().subscribe(url => {
            callback(url);
          });
        })
      ).subscribe();
      this.dutil.showLoader("アップロード中...");

    }, (err) => {
      alert(JSON.stringify(err));
    });

  }

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
