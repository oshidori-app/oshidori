import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UtilService } from '../../providers/util.service';
import { UserRegistrationService, IUserRegistration, Gender } from '../../providers/account-management.service';
import { AccountConfirmationCodePage } from '../account-confirmation-code/account-confirmation-code';
import { Auth, Logger } from 'aws-amplify';

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

  error: any;

  constructor(public navCtrl: NavController, public util: UtilService) {
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
      this.error = null;
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
      
      Auth.signUp(param)
        .then(user => {
          this.navCtrl.setRoot(AccountConfirmationCodePage, { username: details.username, password: details.password});
        })
        .catch(err => {
          this.error = err;
          this.util.showAlert('登録失敗', err.message);
        })
        .then(() => this.util.dismissLoader());
    }
  }
  // onSignUp(form) {
  //   this.submitted = true;

  //   if (form && form.valid) {
  //     UserRegistrationService.signUp(this.userData).then(() => {
  //       // Sign-up successful. Redirect to confirm sign-up page.
  //       this.navCtrl.push(this.accountConfirmationCodePage);

  //     }).catch((err: Error) => {
  //       this.showAlert('登録に失敗しました', err.message);
  //       console.log(err);
  //     });
  //   }
  // }

}
