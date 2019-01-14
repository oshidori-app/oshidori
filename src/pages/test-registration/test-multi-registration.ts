import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DisplayUtilService } from '../../providers/display-util.service';
import { v4 as uuid } from 'uuid';
import { StorageService } from '../../providers/storage.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Logger } from '../../logger';
import { ImagePickerService } from '../../providers/image-picker.service';

export class ImageVm {
  uploadPercent?: Observable<number>
  downloadUrl?: Observable<string>
}

@Component({
  selector: 'page-test-multi-registration',
  templateUrl: 'test-multi-registration.html',
})
export class TestMultiRegistrationPage {

  public imageVms: ImageVm[] = [];

  private selectedPhoto: any;
  private imgRef: string;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private storage: StorageService,
    private dutil: DisplayUtilService,
    private imagePicker: ImagePickerService) {
    this.selectedPhoto = null;
  }

  async onClickSelectPhotoButton() {

    if (!this.platform.is("cordova")) {
      this.dutil.showLoader("動くのはnative環境のみです。")
      return;
    }

    let imageFiles = null;
    try {
      imageFiles = await this.imagePicker.getMultipleFiles();
    } catch (e) {
      this.dutil.showToast(e);
      return;
    }

    imageFiles.forEach((file, i) => {
      let fileName = uuid();
      Logger.debug(fileName);
      this.selectedPhoto = file;
      if (this.selectedPhoto) {
        this.imageVms.push(new ImageVm());
        let uploadTask = this.storage.uploadBlob(this.selectedPhoto, fileName);
        this.imageVms[i].uploadPercent = uploadTask.percentageChanges();
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            this.imageVms[i].downloadUrl = uploadTask.ref.getDownloadURL();
            this.imgRef = uploadTask.fullPath,
              Logger.debug("upload completed.:" + this.imgRef);
          })
        ).subscribe();
      }
    })
  }

  ionViewDidEnter() {
    Logger.debug("ionViewDidEnter: TestMultiRegistrationPage")
  }
}
