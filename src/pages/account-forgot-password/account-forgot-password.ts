import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { DisplayUtilService } from '../../providers/display-util.service';
import { Logger } from '../../logger';
@Component({
  templateUrl: 'account-forgot-password.html',
})
export class AccountForgotPasswordPage {

  public formData: {
    email?: string,
  } = {};
  public resetSubmitted = false;
  public reseted = false;

  constructor(private navCtrl: NavController, private auth: AuthService, private dutil: DisplayUtilService) {
  }

  onResetSubmit(form) {
    this.resetSubmitted = true;

    if (form && form.valid) {
      this.auth.resetPassword(this.formData.email)
        .then(() => this.reseted = true)
        .catch(err => {
          this.dutil.showAlert('エラー', 'メールを送信できませんでした。 再度お試しください');
          Logger.error(err);
        });
    }
  }
}
