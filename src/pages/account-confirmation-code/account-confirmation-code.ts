import { HomePage } from '../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { UtilService } from '../../providers/util.service';
import { Auth, Logger } from 'aws-amplify';

const logger = new Logger('AccountConfirm');
@Component({
  templateUrl: 'account-confirmation-code.html',
})
export class AccountConfirmationCodePage {

  public username: string;
  private password: string;
  public code: string;

  constructor(private navCtrl: NavController, public navParams: NavParams, public util: UtilService) {
    this.username = navParams.get('username');
    this.password = navParams.get('password');
  }

  public submitted: boolean = false;

  confirmSignUp(form) {
    this.submitted = true;
    if (form && form.valid) {
      Auth.confirmSignUp(this.username, this.code)
      .then(() => {
        this.util.showAlert('登録完了', 'oshidoriへようこそ。', () => {
          Auth.signIn(this.username, this.password)
          .then(user => {
            logger.debug('signed in user', user);
            this.navCtrl.popToRoot({ animate: false });
            this.navCtrl.push(HomePage);
          })
          .catch(err => {
            logger.debug('errrror', err.message);
          })
          .then(() => {
            this.util.dismissLoader();
          }
          );
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
