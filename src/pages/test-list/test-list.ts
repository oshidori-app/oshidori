import { Component, NgModule } from '@angular/core';
import { DateTime, NavController } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';
import { Observable, Subscription } from 'rxjs';

import { Logger } from '../../logger';
import { Test } from '../../models/test';
import { AuthService } from '../../providers/auth.service';
import { DisplayUtilService } from '../../providers/display-util.service';
import { StorageService } from '../../providers/storage.service';
import { TestRepository } from '../../repository/test.repository';
import { SubTestRegistrationPage } from '../test-registration/sub-test-registration';

export class TestListVm {
  title?: string;
  description?: string;
  downloadUrl?: Observable<string>;
  refPath?: string;
  updated?: DateTime;
  imgLoaded?: boolean;
}

@Component({
  selector: 'page-test-list',
  templateUrl: 'test-list.html',
})
export class TestListPage {

  testListVms: TestListVm[];
  private listSubscription: Subscription;

  fakeList: any[] = new Array(10);

  constructor(public navCtrl: NavController, private testRepo: TestRepository, private auth: AuthService, private storage: StorageService, private dutil: DisplayUtilService) {
  }

  private getTests() {
    const test = new Test();
    this.listSubscription = this.testRepo.list(test)
      .subscribe(testList => {
        this.testListVms = testList;
        testList.forEach((test, i) => {
          const imgUrl = this.storage.getDownloadURL(test.imgUrl);
          this.testListVms[i].downloadUrl = imgUrl;
          this.testListVms[i].updated = new Date().getTime() + test.updated.seconds;
          this.testListVms[i].refPath = test.ref.path;
          this.testListVms[i].imgLoaded = false;
        });
      });
  }

  onClickToSubCollection(testVm) {
    let test = new Test();
    test = testVm;
    this.navCtrl.push(SubTestRegistrationPage, test);
  }

  onImageLoaded(index) {
    Logger.debug('loaded: ' + index);
    this.testListVms[index].imgLoaded = true;
  }

  ionViewWillEnter() {
    Logger.debug('ionViewWillEnter: TeltListPage');
    this.getTests();
  }

  ionViewDidLeave() {
    if (this.listSubscription) { this.listSubscription.unsubscribe(); }
  }
}
