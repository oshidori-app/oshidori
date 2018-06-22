import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UserRegistrationService, IUserRegistration, Gender } from '../../providers/account-management.service';
import { AccountConfirmationCodePage } from '../account-confirmation-code/account-confirmation-code';
import { GlobalStateService } from '../../providers/global-state.service';
import { Logger } from '../../providers/logger.service';

@Component({
  selector: 'account-signup',
  templateUrl: 'account-signup.html'
})
export class AccountSignupPage {
  accountConfirmationCodePage = AccountConfirmationCodePage;

  public userData: IUserRegistration = {
    username: '',
    password: '',
    gender: '',
    birthDate: '',
  };
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
      UserRegistrationService.signUp(this.userData).then(() => {
        // Sign-up successful. Redirect to confirm sign-up page.
        this.navCtrl.push(this.accountConfirmationCodePage);

      }).catch((err: Error) => {
        this.showAlert('登録に失敗しました', err.message);
        console.log(err);
      });
    }
  }

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

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private userRegistrationService: UserRegistrationService, private globals: GlobalStateService) {
  }

  ionViewDidEnter() {
    Logger.banner("Register");
  }
}
