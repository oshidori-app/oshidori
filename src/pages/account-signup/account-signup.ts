import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
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

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

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
          this.navCtrl.push(AccountConfirmationCodePage, { username: details.username });
        })
        .catch(err => {
          this.error = err;
          this.showAlert('登録に失敗しました', err.message);
        })
        .then(() => loading.dismiss());
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

  private showAlert(title: string, subTitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('OK clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
