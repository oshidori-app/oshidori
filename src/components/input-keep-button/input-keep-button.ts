import { Component, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController, NavController } from 'ionic-angular';
import { finalize } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { InputKeepPage } from '../../pages/input-keep/input-keep';
import { DisplayUtilService } from '../../providers/display-util.service';
import { StorageService } from '../../providers/storage.service';
/**
 * Generated class for the InputKeepButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'input-keep-button',
  templateUrl: 'input-keep-button.html',
})
export class InputKeepButtonComponent {
  @Input() task: string;

  private imgRef: string;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private dutil: DisplayUtilService,
    private storage: StorageService) {
      console.log(this.task);
      }

  showMenu(fileInput: HTMLElement) {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '(ForDev) native無し画像選択',
          handler: () => {
            fileInput.click();
            fileInput.onchange = event => {
              const files = (event.target as HTMLInputElement).files;
              const file = files[0];

              const uploadTask = this.storage.uploadFile(file, uuid());
              this.dutil.showLoader('アップロード中...');
              uploadTask.snapshotChanges().pipe(
                finalize(() => {
                  this.imgRef = uploadTask.fullPath;
                  this.dutil.dismissLoader();
                  this.navCtrl.push(InputKeepPage, { selectedTask: this.task, imgUrl: this.imgRef });
                })
              ).subscribe();
            };
          },
        },
        {
          text: 'カメラで撮影する',
          handler: () => {
            // revisit: await したい...
            const next = () => this.navCtrl.push(InputKeepPage, { selectedTask: this.task, imgUrl: this.imgRef });
            this.takePhotoAndUpload(next);
          },
        }, {
          text: 'ライブラリから選択する',
          handler: () => {
            const next = () => this.navCtrl.push(InputKeepPage, { selectedTask: this.task, imgUrl: this.imgRef });
            this.getFromLibraryAndUpload(next);
          },
        }, {
          text: 'キャンセル',
          role: 'cancel',
        },
      ],
    });
    actionSheet.present();
  }

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
      sourceType: number,
    };

    this.camera.getPicture(options).then(imageData => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      const selectedPhoto = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);

      const fileName = uuid();
      const uploadTask = this.storage.uploadBlob(selectedPhoto, fileName);
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          this.imgRef = uploadTask.fullPath;
          callback();
        })
      ).subscribe();
      this.dutil.showLoader('アップロード中...');

    }, err => {
      alert(JSON.stringify(err));
    });

  }

  dataURItoBlob(dataURI) {
    // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }
}
