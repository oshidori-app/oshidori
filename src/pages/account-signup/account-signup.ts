import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AccountConfirmationCodePage } from '../account-confirmation-code/account-confirmation-code';
import { AuthService } from '../../providers/auth.service';
import { DisplayUtilService } from '../../providers/display-util.service';
import { User, Gender } from "../../models/user";
import { UserRepository } from '../../repository/user.repository';
import { Logger } from '../../logger';
import { GroupRepository } from '../../repository/group.repository';
import { Group } from '../../models/group';
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

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private userRepo: UserRepository,
    private groupRepo: GroupRepository,
    private dutil: DisplayUtilService
  ) {
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

      this.auth.signUp({ email: details.username, password: details.password })
        .then(res => {
          let uid = res.user.uid;


          // モデル生成
          let group = new Group({
            name: 'ラブリー！'
          });

          let user = new User({
            userId: uid,
            gender: details.gender,
            birthdate: details.birthdate
          });

          // GroupとUserを同時に作成する
          this.groupRepo.add(group, uid)
            .then((ref) => {
              Logger.debug(ref);
              // group登録が完了したらuserの登録
              user.parentRef = ref;
              this.userRepo.add(user, uid)
              .then(() => {
                this.navCtrl.setRoot(AccountConfirmationCodePage);
              })
              .catch(err => {
                // TODO 失敗したらfbauthからも消す。
                this.dutil.showToast(err);
                Logger.error(err);
                return;
              });

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
