import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Logger } from 'aws-amplify';

const logger = new Logger('Util');

@Injectable()
export class DisplayUtilService {

  private loader = null;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
  }

  showAlert(title: string, message: string, okCallbackFunction = null): void {
    let _callback = () => {};
    if(okCallbackFunction != null) {
        _callback = okCallbackFunction;
    }
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [{ text: 'OK', handler: _callback }]
    });
    alert.present();
  }

  showToast(message: string, duration: number = 3000): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'bottom'
    });
    toast.present();
  }

  showLoader(message: string, duration: number = 3000): void {
    this.loader = this.loadingCtrl.create({
      content: message,
      duration: duration,
      dismissOnPageChange: true
    });
    this.loader.present();
  }

  dismissLoader(): void {
    if (this.loader != null) {
      this.loader.dismiss();
    }
    this.loader = null;
  }
}
