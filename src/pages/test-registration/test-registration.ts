import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DisplayUtilService } from '../../providers/display-util.service';
import { TestRepository } from '../../repository/test.repository';
import { Test } from '../../models/test';
import { AuthService } from '../../providers/auth.service';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { v4 as uuid } from 'uuid';
import { StorageService } from '../../providers/storage.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Logger } from '../../logger';

@Component({
  selector: 'page-test-registration',
  templateUrl: 'test-registration.html',
})
export class TestRegistrationPage {

  public testRegistrationVm: {
    title?: string,
    description?: string,
    uploadPercent?: string,
    downloadUrl?: Observable<string>,
  } = {};

  private selectedPhoto: Blob;
  private imgRef: string = null;

  constructor(public navCtrl: NavController, private testRepo: TestRepository, private auth: AuthService, private storage: StorageService, private dutil: DisplayUtilService, private camera: Camera) {
    this.selectedPhoto = null;
  }

  onClickRegistration(form) {
    if (form && form.valid) {
      Logger.debug(form);

      // テストのドキュメントを作成
      let test = new Test({
        title: this.testRegistrationVm.title ? this.testRegistrationVm.title : null,
        description: this.testRegistrationVm.description ? this.testRegistrationVm.description : null,
        imgUrl: this.imgRef,
      });

      // データ登録
      this.testRepo.add(test)
        .then((ref) => {
          this.dutil.showToast('登録しました');
        })
        .catch(err => {
          this.dutil.showToast(err);
          Logger.error(err);
          return;
        });
    }
  }

  onChangeFileSelection(event) {
    const files = event.target.files;
    const file = files[0];

    let uploadTask = this.storage.uploadFile(file, uuid());
    this.testRegistrationVm.uploadPercent = uploadTask.percentageChanges();
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.testRegistrationVm.downloadUrl = uploadTask.ref.getDownloadURL();
        this.imgRef = uploadTask.fullPath;
        this.dutil.dismissLoader();
        Logger.debug('登録完了');
      })
    ).subscribe();
  }

  dataURItoBlob(dataURI) {
    // code adapted from: http://stackoverflow.com/questions/33486352/cant-upload-image-to-aws-s3-from-ionic-camera
    let binary = atob(dataURI.split(',')[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }

  ionViewDidEnter() {
    Logger.debug('ionViewDidEnter: TestRegistrationPage');
  }
}
