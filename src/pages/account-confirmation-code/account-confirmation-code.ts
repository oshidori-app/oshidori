import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { UtilService } from '../../providers/util.service';
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('SignUpConfirm');
@Component({
  templateUrl: 'account-confirmation-code.html',
})
export class AccountConfirmationCodePage {

  public username: string;
  public code: string;

  constructor(private navCtrl: NavController, public navParams: NavParams, public util: UtilService) {
    this.username = navParams.get('username');
  }

  public submitted: boolean = false;

  confirmSignUp(form) {
    this.submitted = true;
    if (form && form.valid) {
      Auth.confirmSignUp(this.username, this.code)
      .then(() => {
        this.util.showAlert('登録完了', 'oshidoriへようこそ。', () => {
          this.navCtrl.popToRoot({ animate: false });
        })
      })
      .catch(err => {
        logger.debug('confirm error', err);
        this.util.showAlert('登録失敗', err.message);
      });
    }
  }

  resendCode() {
    Auth.resendSignUp(this.username)
      .then(() => logger.debug('confirmation code re-send'))
      .catch(err => logger.debug('send code error', err));
  }

  ionViewDidEnter() {
   logger.info("Confirmation Code");
  }
}
