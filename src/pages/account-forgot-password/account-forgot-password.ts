import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { GlobalStateService } from '../../providers/global-state.service';
import { UserLoginService, CognitoUtil } from '../../providers/account-management.service';
import { Logger } from '../../providers/logger.service';


@Component({
  templateUrl: 'account-forgot-password.html',
})

export class AccountForgotPasswordPage {

  formData: {
    verificationCode?: string,
    password?: string
  } = {};

  alertCtrl: AlertController = this.globals.getAlertController();

  updateSubmitted: boolean = false;
  resetSubmitted: boolean = false;

  onResetSubmit(form) {

    UserLoginService.forgotPassword(this.navParams.get('username')).then((data) => {
      // this.allowButtonPresses = true;
      console.log('正常終了：パスワードリセット処理。メール送信。Cognitoのレスポンス:\n' + data);
      this.resetSubmitted = true;
    }).catch((err: Error) => {
      // this.allowButtonPresses = true;
      console.log('異常終了：パスワードリセット処理', err);
      let alert = this.alertCtrl.create({
        title: '失敗しました',
        subTitle: `パスワードリセット時にエラーが発生しました。: [${err}] 再度お試しください。`,
        buttons: [{ text: 'OK' }]
      });
      alert.present();
      this.resetSubmitted = false;

    });

  }

  onUpdateSubmit(form) {
    this.updateSubmitted = true;

    if (form && form.valid) {
      console.log('Form User data' + this.formData);
      UserLoginService.confirmForgotPassword(CognitoUtil.getUsername(), this.formData.verificationCode, this.formData.password)
        .then(() => {
          console.log("正常終了：パスワード変更");
          this.showSuccessAlert();
        }).catch((err: Error) => {
          console.log('異常終了：パスワード変更', err);
          this.showFailureAlert();
        });
    }
  }

  showSuccessAlert() {
    let alertController = this.globals.getAlertController();
    let alert = alertController.create({
      title: 'パスワードを変更しました',
      subTitle: 'パスワードの変更が完了しました。新しいパスワードでログインしてください。',
      buttons: [{
        text: 'ログイン画面に戻る',
        handler: data => {
          // go back to the Signin screen
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }

  showFailureAlert() {
    let alertController = this.globals.getAlertController();
    let alert = alertController.create({
      title: 'エラーが発生しました',
      subTitle: 'パスワード変更時にエラーが発生しました',
      buttons: [{
        text: 'ログイン画面に戻ります',
        handler: data => {
          // go back to the Signin screen
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private globals: GlobalStateService) {

  }

  ionViewDidEnter() {
    Logger.banner("Forgot Password");
  }
}
