import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UtilService } from '../../providers/util.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  templateUrl: 'account-forgot-password.html',
})
export class AccountForgotPasswordPage {

  public formData: {
    email?: string
  } = {};
  public resetSubmitted: boolean = false;
  public reseted: boolean = false;

  constructor(private navCtrl: NavController, private auth: AuthService, private util: UtilService) {
  }

  onResetSubmit(form) {
    this.resetSubmitted = true;

    if (form && form.valid) {
      this.auth.resetPassword(this.formData.email)
        .then(() => this.reseted = true)
        .catch(err => {
          this.util.showAlert('エラー', 'メールを送信できませんでした。 再度お試しください')
        });
    }
  }
}
