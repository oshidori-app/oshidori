import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { DisplayUtilService } from '../../providers/display-util.service';
import { Logger } from '../../providers/logger.service';
@Component({
  templateUrl: 'account-confirmation-code.html',
})
export class AccountConfirmationCodePage {

  public username: string;

  constructor(private navCtrl: NavController, private auth: AuthService, private dutil: DisplayUtilService) {
  }

  resendEmail(form) {
    if (form && form.valid) {
      this.auth.mailVerify()
        .then(res => {
        })
        .catch(err => {
          this.dutil.showAlert('エラー', err.message);
          Logger.error(err);
        })
    }
  }

  // Dynamic Linkでverifyしたい
  confirmVerify(form) {
    if (form && form.valid) {
      this.auth.getUser().reload().then(user => {
        if(this.auth.getUser().emailVerified) {
          this.navCtrl.setRoot(HomePage);
        } else {
          Logger.error('verification not completed');
        }
      });
  }
}
}
