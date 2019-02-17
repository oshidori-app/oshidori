import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class DisplayUtilService {

  private loader = null;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
  }

  showAlert(title: string, message: string, okCallbackFunction = null): void {
    let _callback = () => {};
    if (okCallbackFunction != null) {
        _callback = okCallbackFunction;
    }
    let alert = this.alertCtrl.create({
      title,
      subTitle: message,
      buttons: [{ text: 'OK', handler: _callback }],
    });
    alert.present();
  }

  showToast(message: string, duration = 3000): void {
    let toast = this.toastCtrl.create({
      message,
      duration,
      position: 'bottom',
    });
    toast.present();
  }

  showLoader(message: string, duration = 3000): void {
    this.loader = this.loadingCtrl.create({
      content: message,
      duration,
      dismissOnPageChange: true,
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
