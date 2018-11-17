import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DisplayUtilService } from '../../providers/display-util.service';
import { TestRepository } from '../../repository/test.repository';
import { Logger } from '../../providers/logger.service';
import { Test } from '../../models/test';
import { AuthService } from '../../providers/auth.service';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { v4 as uuid } from 'uuid';
import { StorageService } from '../../providers/storage.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'page-test-registration',
  templateUrl: 'test-registration.html',
})
export class TestRegistrationPage {

  public testRegistrationVm: {
    title?: string,
    description?: string
  } = {};

  public uploadPercent;
  public selectedPhoto: Blob;

  constructor(public navCtrl: NavController, private testRepo: TestRepository, private auth: AuthService, private storage: StorageService, private dutil: DisplayUtilService, private camera: Camera) {
    this.selectedPhoto = null;
  }

  onClickRegistration(form) {
    if (form && form.valid) {
      Logger.debug(form);

      let fileName = uuid();
      this.upload(fileName);

      let user = this.auth.getUser();
      let test = new Test({
        groupId: user.uid, //TODO 認証成功したらグローバル変数から取得したい
        userId: user.uid, //TODO 認証成功したらグローバル変数から取得したい
        title: this.testRegistrationVm.title,
        description: this.testRegistrationVm.description,
        imgUrl: fileName
      }
      );

      this.testRepo.add(test)
        .then(() => {
          this.dutil.showToast('登録しました');
        })
        .catch(err => {
          this.dutil.showToast(err);
          Logger.error(err);
          return;
        });
    }
  }

  onClickImageSelection(form) {
    const options: CameraOptions = {
      quality: 50,
      // targetHeight: 200,
      // targetWidth: 200,
      destinationType: this.camera.DestinationType.DATA_URL, //Base64形式で返却
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // base64をBlobに変換
      this.selectedPhoto = this.dataURItoBlob('data:image/jpeg;base64,' + imageData);
    }).catch(err => {
      console.log(err);
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

  private upload(fileName: string): void {
    if (this.selectedPhoto) {

      this.dutil.showLoader('アップロードしています...');
      let task = this.storage.upload(this.selectedPhoto, fileName);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.dutil.dismissLoader();
          Logger.debug("登録完了");
        })
      ).subscribe();
    }
  }

}
