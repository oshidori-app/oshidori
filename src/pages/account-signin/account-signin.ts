import { Component, NgModule } from '@angular/core';
import { HomePage } from '../home/home';
import { AccountForgotPasswordPage } from '../account-forgot-password/account-forgot-password';
import { AccountConfirmationCodePage } from '../account-confirmation-code/account-confirmation-code';
import { AccountSignupPage } from '../account-signup/account-signup';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { DisplayUtilService } from '../../providers/display-util.service';
import { Logger } from '../../logger';
import { GroupRepository } from '../../repository/group.repository';
import { UserRepository } from '../../repository/user.repository';
import { Group } from '../../models/group';
import { User } from '../../models/user';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
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
    private loadingCtrl: LoadingController,
    private auth: AuthService,
    private groupRepo: GroupRepository,
    private userRepo: UserRepository,
    private clientStorage: Storage,
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

        // groupへの参照を取得
        let userRef = null;
        this.clientStorage.get('userRef')
          .then(val => {

            // 参照がクライアントストレージにない場合。アプリ再インストール。サインアップを別端末でしたなど。
            if(!val || val == ''){
              //TODO firebaseのidからたどる
            }
            this.subscription = this.userRepo.find(val)
            .subscribe(user => {
              Logger.debug('find user');
              Logger.debug(user);
              Logger.debug('client storage saved. groupRef:' + user.groupRef.path);
              this.clientStorage.set('groupRef', user.groupRef.path)
                .catch(err => Logger.error(err));
              Logger.debug('clientStorageSaved');
              Logger.debug(user.groupRef);
            });
          })
          .catch(err => {
            Logger.error(err);
          });
        this.navCtrl.popToRoot({ animate: false });
        this.allowButtonPresses = true;
        this.navCtrl.push(HomePage);
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

  ionViewDidLeave() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}