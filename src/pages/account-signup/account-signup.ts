import { Component, NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { v4 as uuid } from 'uuid';

import { Logger } from '../../logger';
import { Group } from '../../models/group';
import { Gender, User } from '../../models/user';
import { AuthService } from '../../providers/auth.service';
import { DisplayUtilService } from '../../providers/display-util.service';
import { GroupRepository } from '../../repository/group.repository';
import { UserRepository } from '../../repository/user.repository';
import { AccountConfirmationCodePage } from '../account-confirmation-code/account-confirmation-code';
export class UserDetails {
  username: string;
  password: string;
  email: string;
  gender: string;
  birthdate: string;
}

@Component({
  selector: 'account-signup',
  templateUrl: 'account-signup.html',
})
export class AccountSignupPage {

  userDetails: UserDetails;

  private user: User;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private userRepo: UserRepository,
    private groupRepo: GroupRepository,
    private clientStorage: Storage,
    private dutil: DisplayUtilService
  ) {
    this.userDetails = new UserDetails();
  }

  genderList = [
    {
      value: Gender.Male,
      text: Gender[Gender.Male],
    }, {
      value: Gender.Female,
      text: Gender[Gender.Female],
    }, {
      value: Gender.Other,
      text: Gender[Gender.Other],
    },
  ];

  submitted = false;

  onSignUp(form) {

    this.submitted = true;

    if (form && form.valid) {

      this.dutil.showLoader('登録しています...');

      const details = this.userDetails;

      this.auth.signUp({ email: details.username, password: details.password })
        .then(res => {
          const uid = res.user.uid;

          // モデル生成
          const group = new Group({
            name: '未設定',
            connectCode: uuid(),
          });

          const user = new User({
            userId: uid,
            gender: details.gender,
            birthdate: details.birthdate,
          });

          // GroupとUserを同時に作成する
          this.groupRepo.add(group, uid)
            .then(groupRef => {
              Logger.debug(groupRef);
              // group登録が完了したらuserの登録
              user.parentRef = groupRef;
              // groupへの参照は自身の初期グループ
              user.groupRef = groupRef;
              this.userRepo.add(user, uid)
              .then(userRef => {
                Logger.debug('groupRefを追加します：' + groupRef.path);
                // storageにgroup情報を保存
                this.clientStorage.set('groupRef', groupRef.path)
                  .then(() => {
                    this.navCtrl.setRoot(AccountConfirmationCodePage);
                  })
                  .catch(err => {
                    this.dutil.showToast(err);
                    Logger.error(err);
                  });
              })
              .catch(err => {
                // TODO 失敗したらfbauthからも消す。トランザクション検討。
                this.dutil.showToast(err);
                Logger.error(err);
                return;
              });
            })
            .catch(err => {
              // TODO 失敗したらfbauthからも消す。トランザクション検討。
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
            });
        })
        .catch(err => {
          this.dutil.showAlert('登録失敗', err.message);
          Logger.debug(err);
        })
        .then(() => this.dutil.dismissLoader());
    }
  }
}
