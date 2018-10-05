import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UtilService } from '../../providers/util.service';
import { AccountChangePasswordPage } from '../account-change-password/account-change-password';
import { Auth, Storage, Logger } from 'aws-amplify';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AccountSigninPage } from '../account-signin/account-signin';

const logger = new Logger('Account');

@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  @ViewChild('avatar') avatarInput;

  public avatarPhoto: string;
  public selectedPhoto: Blob;
  public userId: string;
  public username: string;
  public attributes: any;

  viewAdminFeatures = false;
  accountChangePasswordPage = AccountChangePasswordPage;

  imageUploadEventListenerAttached = false;
  profileImageDisplay = false;
  submitted: boolean = false;

  constructor(private navCtrl: NavController, public camera: Camera, public util: UtilService) {
    this.attributes = [];
    this.avatarPhoto = null;
    this.selectedPhoto = null;

    Auth.currentUserInfo()
    .then(info => {
      this.userId = info.id;
      this.username = info.username;
      this.attributes = [];
      if (info.attributes['email']) { this.attributes.push({ name: 'email', value: info.attributes['email']}); }
      if (info.attributes['birthdate']) { this.attributes.push({ name: 'birthdate', value: info.attributes['birthdate']}); }
      if (info.attributes['gender']) { this.attributes.push({ name: 'gender', value: info.attributes['gender']}); }
      this.refreshAvatar();
    });
  }

  signOut() {
    Auth.signOut()
    .then(() => this.navCtrl.setRoot(AccountSigninPage));
  }

  changePassword() {
    this.navCtrl.push(AccountChangePasswordPage);
  }
  refreshAvatar() {
    Storage.get(this.userId + '/avatar')
      .then(url => this.avatarPhoto = (url as string));
  }

  selectAvatar() {
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
      this.upload();
    }, (err) => {
      this.avatarInput.nativeElement.click();
      // Handle error
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

  uploadFromFile(event) {
    const files = event.target.files;
    logger.debug('Uploading', files)

    const file = files[0];
    const { type } = file;
    Storage.put(this.userId + '/avatar', file, { contentType: type })
      .then(() => this.refreshAvatar())
      .catch(err => logger.error(err));
  }

  upload() {
    if (this.selectedPhoto) {

      this.util.showLoader('アップロードしています...')

      Storage.put(this.userId + '/avatar', this.selectedPhoto, { contentType: 'image/jpeg' })
        .then(() => {
          this.refreshAvatar()
          this.util.dismissLoader();
        })
        .catch(err => {
          logger.error(err)
          this.util.dismissLoader();
        });
    }
  }
}
