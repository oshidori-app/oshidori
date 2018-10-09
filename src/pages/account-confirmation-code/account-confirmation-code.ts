import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilService } from '../../providers/util.service';
import { Auth, Logger } from 'aws-amplify';
import { AuthService } from '../../providers/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AccountSigninPage } from '../account-signin/account-signin';

const logger = new Logger('AccountConfirm');
@Component({
  templateUrl: 'account-confirmation-code.html',
})
export class AccountConfirmationCodePage {

  public username: string;

  constructor(private navCtrl: NavController, private auth: AuthService, public util: UtilService) {
  }

  resendEmail(form) {
    if (form && form.valid) {
      this.auth.mailVerify()
        .then(res => {
          logger.debug(res);
        })
        .catch(err => {
          this.util.showAlert('エラー', err.message);
          logger.error(err);
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
          logger.info('verification not completed');
        }
      });
  }
}
}
