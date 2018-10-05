import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { GlobalStateService } from '../../providers/global-state.service';
import { UtilService } from '../../providers/util.service';
import { AccountForgotPasswordPage } from '../account-forgot-password/account-forgot-password';
import { AccountConfirmationCodePage } from '../account-confirmation-code/account-confirmation-code';
import { AccountSignupPage } from '../account-signup/account-signup';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth, Logger } from 'aws-amplify';

import {
  UserLoginService, IUserLogin, UserState,
  UserRegistrationService, CognitoUtil, Gender
} from '../../providers/account-management.service';

const logger = new Logger('SignIn');

export class SignInDetails {
  username: string;
  password: string;
}

@Component({
  selector: 'account-signin',
  templateUrl: 'account-signin.html',
})
export class AccountSigninPage {

  public signInDetails: SignInDetails;

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public util: UtilService,
    public globals: GlobalStateService) {
    this.signInDetails = new SignInDetails();
  }

  allowButtonPresses = true; // 複数ボタン押下抑制用

  signInButtonClicked: boolean = false;
  forgotPasswordButtonClicked: boolean = false;

  onSignIn(form) {
    this.signInButtonClicked = true;
    this.forgotPasswordButtonClicked = false;

    if (form && form.valid) {
      this.login();
    }
  }

  onSignUp(): void {
    this.navCtrl.push(AccountSignupPage);
  }

  onForgotPassword(form): void {
    if (!this.allowButtonPresses) {
      return;
    }
    this.signInButtonClicked = false;
    this.forgotPasswordButtonClicked = true;
    this.allowButtonPresses = false;
    if (form) {
      this.allowButtonPresses = true;
      this.navCtrl.push(AccountForgotPasswordPage);
    }
  }

  login(): void {
    // 複数クリックを抑制
    if (!this.allowButtonPresses) {
      return;
    }

    this.allowButtonPresses = false;
    this.util.showLoader('ログインしています...');

    let details = this.signInDetails;
    logger.info('login..');
    Auth.signIn(details.username, details.password)
      .then(user => {
        logger.debug('signed in user', user);
        this.navCtrl.popToRoot({ animate: false });
        this.allowButtonPresses = true;
        this.navCtrl.push(HomePage);
      })
      .catch(err => {
        logger.debug('errrror', err.message);

        let goConfirm = () => {
          if (err.code === 'UserNotConfirmedException') {
            this.navCtrl.setRoot(AccountConfirmationCodePage, { username: details.username, password: details.password });
          }
        }
        this.util.showAlert('ログイン失敗', err.message, goConfirm);

      })
      .then(() => {
        this.util.dismissLoader();
        this.allowButtonPresses = true;
      }
      );
  }
}