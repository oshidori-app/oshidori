import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UtilService } from '../../providers/util.service';
import { UserRegistrationService, IUserRegistration, Gender } from '../../providers/account-management.service';
import { AccountConfirmationCodePage } from '../account-confirmation-code/account-confirmation-code';
import { Auth, Logger } from 'aws-amplify';
import { AuthService } from '../../providers/auth.service';

const logger = new Logger('SignUp');

export class UserDetails {
  username: string;
  password: string;
  email: string;
  gender: string;
  birthdate: string;
}

@Component({
  selector: 'account-signup',
  templateUrl: 'account-signup.html'
})
export class AccountSignupPage {

  public userDetails: UserDetails;

  constructor(private navCtrl: NavController, private auth: AuthService, private util: UtilService) {
    this.userDetails = new UserDetails();
  }

  public genderList = [
    {
      value: Gender.Male,
      text: Gender[Gender.Male]
    }, {
      value: Gender.Female,
      text: Gender[Gender.Female]
    }, {
      value: Gender.Other,
      text: Gender[Gender.Other]
    }
  ]

  public submitted: boolean = false;

  onSignUp(form) {

    this.submitted = true;

    if (form && form.valid) {

      this.util.showLoader('登録しています...');

      let details = this.userDetails;
      logger.debug('register');

      let param = {
        username: details.username,
        password: details.password,
        attributes: {
          email: details.username, // username same value
          gender: details.gender,
          birthdate: details.birthdate
        }
      }

      this.auth.signUp({ email: details.username, password: details.password })
        .then(res => {
          this.auth.mailVerify()
            .then(res => {
              logger.debug(res);
            })
            .catch(err => {
              this.util.showAlert('エラー', err.message);
              logger.error(err);
            })
          this.navCtrl.setRoot(AccountConfirmationCodePage);
          logger.info(res);
        })
        .catch(err => {
          logger.error(err);
          this.util.showAlert('登録失敗', err.message);
        })
        .then(() => this.util.dismissLoader());
    }
  }
}
