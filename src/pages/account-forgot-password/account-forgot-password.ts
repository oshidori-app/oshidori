import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, Logger } from 'aws-amplify';
import { UtilService } from '../../providers/util.service';

const logger = new Logger('AccountForgotPassword');

// TODO この画面分かりにくいので再発行とVerifyで分ける
@Component({
  templateUrl: 'account-forgot-password.html',
})
export class AccountForgotPasswordPage {

  public formData: {
    email?: string,
    verificationCode?: string,
    password?: string
  } = {};
  public updateSubmitted: boolean = false;
  public resetSubmitted: boolean = false;
  public reseted: boolean = false;

  constructor(public navCtrl: NavController, public util: UtilService) {
  }

  onResetSubmit(form) {
    this.resetSubmitted = true;

    if (form && form.valid) {
      Auth.forgotPassword(this.formData.email)
        .then(() => this.reseted = true)
        .catch((err: Error) => {
          logger.error(err);
          this.util.showAlert('エラー', 'パスワードリセットに失敗しました。 再度お試しください')
        });
    }
  }

  onUpdateSubmit(form) {
    this.updateSubmitted = true;

    if (form && form.valid) {
      let title, message;
      let callback = null;
      Auth.forgotPasswordSubmit(this.formData.email, this.formData.verificationCode, this.formData.password)
        .then(() => {
          title = '変更完了';
          message = 'パスワードの変更が完了しました。新しいパスワードでログインしてください。';
          callback = () => this.navCtrl.pop();
        }).catch((err: Error) => {
          logger.error(err);
          title = 'エラー';
          message = `パスワード変更時にエラーが発生しました。: ${err}`
        }).then(() => this.util.showAlert(title, message, callback));
    }
  }
}
