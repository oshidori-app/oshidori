import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AccountConfirmationCodePage } from '../account-confirmation-code/account-confirmation-code';
import { AuthService } from '../../providers/auth.service';
import { DisplayUtilService } from '../../providers/display-util.service';
import { Logger } from '../../providers/logger.service';

import { User, Gender } from "../../models/user";
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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

  private user: User;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private navCtrl: NavController, private auth: AuthService, private afStore: AngularFirestore, private dutil: DisplayUtilService) {
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

      this.dutil.showLoader('登録しています...');

      let details = this.userDetails;

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
          let uid = res.user.uid;

          // User情報の保存。モデル側に処理を移動する予定
          this.user = {
            firebaseId: uid,
            gender: details.gender,
            birthdate: details.birthdate,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            updated: firebase.firestore.FieldValue.serverTimestamp()
          };
          this.afStore.collection('users').add(this.user)
            .then((docRef) => {
              this.navCtrl.setRoot(AccountConfirmationCodePage);
            })
            .catch(err => {
              // TODO 失敗したらfbauthからも消す。
              this.dutil.showToast(err);
              Logger.error(err);
              return; 
            });
          
          this.auth.mailVerify()
            .then(res => {
            })
            .catch(err => {
              this.dutil.showToast(err);
              Logger.error(err);
            })
        })
        .catch(err => {
          this.dutil.showAlert('登録失敗', err.message);
          Logger.debug(err);
        })
        .then(() => this.dutil.dismissLoader());
    }
  }
}
