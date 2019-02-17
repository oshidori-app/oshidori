import { Component, NgModule } from '@angular/core';
import { HomePage } from '../home/home';
import { AccountForgotPasswordPage } from '../account-forgot-password/account-forgot-password';
import { AccountConfirmationCodePage } from '../account-confirmation-code/account-confirmation-code';
import { AccountSignupPage } from '../account-signup/account-signup';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { DisplayUtilService } from '../../providers/display-util.service';
import { Logger } from '../../logger';
import { Subscription } from 'rxjs';
import { AppInitializerService } from '../../providers/app-initializer.service';
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
  private subscription: Subscription;

  constructor(private navCtrl: NavController,
    private auth: AuthService,
    private appInitializer: AppInitializerService,
    private dutil: DisplayUtilService) {
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
    this.dutil.showLoader('ログインしています...');

    let details = this.signInDetails;
    this.auth.signIn({ email: details.username, password: details.password })
      .then(res => {
        // メール未検証
        if (!res.user.emailVerified) {
          this.dutil.showAlert('ログイン失敗', '認証が完了していません。', () => {
            this.navCtrl.setRoot(AccountConfirmationCodePage);
          });
          return;
        }
        // 自身のグループへの参照を取得する
        this.appInitializer.restoreGroupReference()
          .then(() => this.goHome())
          .catch(err => Logger.error(err));
      })
      .catch(err => {
        let message = ''
        if (err.code === 'auth/wrong-password') {
          message = 'メールアドレスかパスワードが間違っています';
        } else {
          message = 'ログインできませんでした。もう一度お試しください。'
        }
        this.dutil.showAlert('ログイン失敗', message);
        Logger.debug(err);
      })
      .then(() => {
        this.dutil.dismissLoader();
        this.allowButtonPresses = true;
      }
      );
  }

  private goHome() {
    this.navCtrl.popToRoot({ animate: false });
    this.allowButtonPresses = true;
    this.navCtrl.push(HomePage);
  }

  ionViewDidLeave() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}