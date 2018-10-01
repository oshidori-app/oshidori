import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';
import { GlobalStateService } from '../../providers/global-state.service';
import { AccountForgotPasswordPage } from '../account-forgot-password/account-forgot-password';
import { AccountSignupPage } from '../account-signup/account-signup';

import {
  UserLoginService, IUserLogin, UserState,
  UserRegistrationService, CognitoUtil, Gender
} from '../../providers/account-management.service';
import { Logger } from '../../providers/logger.service';

@Component({
  selector: 'account-signin',
  templateUrl: 'account-signin.html',
})

export class AccountSigninPage {

  allowButtonPresses = true; // 複数ボタン押下抑制用
  accountSignupPage = AccountSignupPage;
  accountForgotPasswordPage = AccountForgotPasswordPage;

  tabsPage = TabsPage;
  alertCtrl: AlertController = this.globals.getAlertController();

  public userData: IUserLogin = {
    username: "tosa.shinichiro.nhs@gmail.com",
    password: "NHS!user1"
  };

  signInButtonClicked: boolean = false;
  forgotPasswordButtonClicked: boolean = false;

  onSignIn(form) {
    this.signInButtonClicked = true;
    this.forgotPasswordButtonClicked = false;

    if (form && form.valid) {
      this.login();
    }
  }

  onForgotPassword(form) {
    if (!this.allowButtonPresses) {
      return;
    }
    this.signInButtonClicked = false;
    this.forgotPasswordButtonClicked = true;
    this.allowButtonPresses = false;
    if (form && this.userData.username != null) {
      this.allowButtonPresses = true;
      this.navCtrl.push(this.accountForgotPasswordPage, { 'username': this.userData.username });
    }
  }

  onSignUp(): void {
    this.navCtrl.push(AccountSignupPage);
  }

  login(): void {
    // 複数クリックを抑制
    if (!this.allowButtonPresses) {
      return;
    }
    this.allowButtonPresses = false;
    this.globals.displayLoader('ログインしています...');
    UserLoginService.signIn(this.userData)
      .then(() => {
        // ログイン成功
        this.globals.dismissLoader();
        this.showLoginSuccessAlert(this.userData.username, () => {
          this.globals.userId = this.globals.getUserId();
          // this.globals.setViewAdminFeaturesOverride(this.globals.isAdminRole());
          this.navCtrl.popToRoot({ animate: false });
          this.allowButtonPresses = true;
          this.navCtrl.push(TabsPage);
        });
      }).catch((err: Error): void => {
        // ログイン失敗
        this.globals.dismissLoader();
        this.allowButtonPresses = true;
        this.displayAlertError(err);
      });
  }

  displayAlertError(err: Error) {
    switch (CognitoUtil.getUserState()) {
      case UserState.InvalidCredentials:
        console.log('ログイン失敗' + err);
        let errorMessage = 'メールアドレスかパスワードが間違っています。再度お試しください。'
        this.showLoginFailureAlert(this.userData.username, errorMessage);
        break;
      case UserState.PendingConfirmation:
        // 確認コード未入力の場合、入力させるか確認コードを再発行する
        console.log('User has not confirmed verification code: ' + err);
        this.showOneTimeVerificationAlert(this.userData.username, () => {
          this.navCtrl.pop();
        });
        break;
      default:
        console.log('Sign-in failed: ' + err);
        errorMessage = `ログイン失敗: ${err}`;
        this.showLoginFailureAlert(this.userData.username, errorMessage);
        break;
    }
  }

  showLoginSuccessAlert(username: String, callbackHandler: () => void): void {
    let alert = this.alertCtrl.create({
      title: 'ログインしました',
      message: `ユーザ名: <b>${username}</b></b>`,
      buttons: [{
        text: 'OK',
        handler: data => {
          callbackHandler();
        }
      }]
    });
    alert.present();
  }

  showResendSuccessAlert(callbackHandler: () => void): void {
    let alert = this.alertCtrl.create({
      title: '確認コード送信',
      subTitle: `新しい確認コードをあなたのメールアドレスに送信しました。`,
      buttons: [{
        text: 'OK',
        handler: data => { callbackHandler(); }
      }]
    });
    alert.present();
  }

  showOneTimeVerificationAlert(username: String, callbackHandler: () => void): void {
    let alert = this.alertCtrl.create({
      title: 'ログイン失敗',
      subTitle: `あなたのメールアドレスに確認コードを送信しています。確認コードを入力して確認ボタンを押してください。もう一度確認コードを送信したい場合は、再送ボタンを押してください。`,
      inputs: [{
        name: 'verificationCode',
        placeholder: '確認コード'
      }],
      buttons: [
        {
          text: '確認',
          handler: data => {
            UserRegistrationService.confirmSignUp(data.verificationCode)
              .then(() => {
                // サインイン
                UserLoginService.signIn(this.userData).then(() => {
                  this.showLoginSuccessAlert(this.userData.username, () => {
                    this.globals.userId = this.globals.getUserId();
                    this.navCtrl.popToRoot({ animate: false });
                    this.navCtrl.push(TabsPage);
                  });
                }).catch((err: Error): void => {
                  this.displayAlertError(err);
                });
              }).catch((err: Error) => {
                console.error(err);
                this.showConfirmationFailureAlert(err);
              });
          }
        },
        {
          text: '再送',
          handler: data => {
            UserRegistrationService.resendConfirmationCode();
            this.showResendSuccessAlert(callbackHandler);
          }
        },
        { text: 'キャンセル' },
      ]
    });
    alert.present();
  }

  showConfirmationFailureAlert(err: Error): void {
    let alert = this.alertCtrl.create({
      title: '確認失敗',
      subTitle: err.message,
      buttons: [{ text: 'OK' }]
    });
    alert.present();
  }


  showLoginFailureAlert(username: String, message: String): void {
    let alert = this.alertCtrl.create({
      title: 'ログイン失敗',
      subTitle: `${message}`,
      buttons: [{ text: 'OK' }]
    });
    alert.present();
  }

  showForgotPasswordFailureAlert(err): void {
    let alert = this.alertCtrl.create({
      title: 'エラー',
      subTitle: `失敗しました: [${err}]. 再度お試しください。`,
      buttons: [{ text: 'OK' }]
    });
    alert.present();
  }

  constructor(public navCtrl: NavController, private globals: GlobalStateService) {

  }

  ionViewDidEnter() {
    Logger.banner("Sign-In");
    this.allowButtonPresses = true;
  }
}
