import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DisplayUtilService } from '../../providers/display-util.service';
import { TestRepository } from '../../repository/test.repository';
import { Logger } from '../../providers/logger.service';
import { Test } from '../../models/test';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'page-test-registration',
  templateUrl: 'test-registration.html',
})
export class TestRegistrationPage {

  public testRegistrationVm: {
    title?: string,
    description?: string,
  } = {};

  constructor(public navCtrl: NavController, private testRepo: TestRepository, private auth: AuthService, private dutil: DisplayUtilService) {
  }

  onClickRegistration(form) {
    if (form && form.valid) {
      Logger.debug(form);

      let user = this.auth.getUser();
      let test = new Test({
        groupId: user.uid, //TODO 認証成功したらグローバル変数から取得したい
        userId: user.uid, //TODO 認証成功したらグローバル変数から取得したい
        title: this.testRegistrationVm.title,
        description: this.testRegistrationVm.description,
      }
      );
      this.testRepo.add(test)
        .then(() => {
          this.dutil.showToast('登録しました');
        })
        .catch(err => {
          this.dutil.showToast(err);
          Logger.error(err);
          return;
        });
    }
  }
}
