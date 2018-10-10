import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilService } from '../../providers/util.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  templateUrl: 'account-confirmation-code.html',
})
export class AccountConfirmationCodePage {

  public username: string;

  constructor(private navCtrl: NavController, private auth: AuthService, private util: UtilService) {
  }

  resendEmail(form) {
    if (form && form.valid) {
      this.auth.mailVerify()
        .then(res => {
        })
        .catch(err => {
          this.util.showAlert('エラー', err.message);
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
          console.log('verification not completed');
        }
      });
  }
}
}
