import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserRegistrationService } from '../../providers/account-management.service';
import { GlobalStateService } from '../../providers/global-state.service';
import { Logger } from '../../providers/logger.service';


@Component({
  templateUrl: 'account-confirmation-code.html',
})
export class AccountConfirmationCodePage {

  public submitted: boolean = false;

  public registrationCode = {
    code: undefined
  };

  confirmSignUp(form) {
    this.submitted = true;
    if (form && form.valid) {
      UserRegistrationService.confirmSignUp(this.registrationCode.code.toString())
        .then(() => {
          this.showConfirmationSuccessAlert();
        }).catch((err: Error) => {
          console.error(err);
          this.showConfirmationFailureAlert(err);
        });
    }
  }

  showConfirmationSuccessAlert(): void {
    let alert = this.alertCtrl.create({
      title: '登録が完了しました！',
      subTitle: `oshidoriへようこそ。`,
      buttons: [{
        text: 'OK',
        handler: data => {
          this.navCtrl.popToRoot({ animate: false });
        }
      }]
    });
    alert.present();
  }

  showConfirmationFailureAlert(err: Error): void {
    let alert = this.alertCtrl.create({
      title: '登録に失敗しました',
      subTitle: err.message,
      buttons: [{
        text: 'OK',
      }]
    });
    alert.present();
  }

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private globals: GlobalStateService) {

  }

  ionViewDidEnter() {
    Logger.banner("Confirmation Code");
  }
}
