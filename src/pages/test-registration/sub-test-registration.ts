import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DisplayUtilService } from '../../providers/display-util.service';
import { AuthService } from '../../providers/auth.service';
import { Logger } from '../../logger';
import { SubTest } from '../../models/sub-test';
import { SubTestRepository } from '../../repository/sub-test.repository';

@Component({
  selector: 'page-sub-test-registration',
  templateUrl: 'sub-test-registration.html',
})
export class SubTestRegistrationPage {

  public subTestRegistrationVm: {
    title?: string,
    description?: string,
    uploadPercent?: string,
  } = {};

  public testRef: any;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private subTestRepo: SubTestRepository,
    private auth: AuthService,
    private dutil: DisplayUtilService) {
      this.testRef = this.navParams.get('ref');
  }

  onClickRegistration(form) {
    if (form && form.valid) {
      Logger.debug(form);

      let user = this.auth.getUser();
      let test = new SubTest({
        groupId: user.uid,
        userId: user.uid,
        title: this.subTestRegistrationVm.title,
        description: this.subTestRegistrationVm.description,
        parentRef: this.testRef, // 引き渡された親参照を設定する
      });

      this.subTestRepo.add(test)
        .then((ref) => {
          this.dutil.showToast('登録しました');
        })
        .catch(err => {
          this.dutil.showToast(err);
          Logger.error(err);
          return;
        });
    }
  }

  ionViewDidEnter() {
    Logger.debug('ionViewDidEnter: SubTestRegistrationPage');
  }
}
