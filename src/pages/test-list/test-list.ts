import { Component, NgModule } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';
import { DisplayUtilService } from '../../providers/display-util.service';
import { TestRepository } from '../../repository/test.repository';
import { Test } from '../../models/test';
import { AuthService } from '../../providers/auth.service';
import { Logger } from '../../logger';
import { StorageService } from '../../providers/storage.service';
import { Observable } from 'rxjs';
import { IonicImageLoader } from 'ionic-image-loader';
import { SubTestRegistrationPage } from '../test-registration/sub-test-registration';

export class TestListVm {
  title?: string
  description?: string
  downloadUrl?: Observable<string>
  refPath?: string
  updated?: DateTime
}

@Component({
  selector: 'page-test-list',
  templateUrl: 'test-list.html',
})
@NgModule({
  imports: [
    IonicImageLoader
  ]
})
export class TestListPage {

  public testListVms: TestListVm[];

  constructor(public navCtrl: NavController, private testRepo: TestRepository, private auth: AuthService, private storage: StorageService, private dutil: DisplayUtilService) {
  }

  private getTests() {
    let test = new Test();
    this.testRepo.list(test)
      .subscribe(testList => {
        Logger.debug(testList);
        this.testListVms = testList;
        testList.forEach((test, i) => {
          Logger.debug(test.updated);
          let imgUrl = this.storage.getDownloadURL(test.imgUrl);
          this.testListVms[i].downloadUrl = imgUrl;
          this.testListVms[i].updated = new Date().getTime() + test.updated;
          this.testListVms[i].refPath = test.ref.path;
        });
      });
  }

  public onClickToSubCollection(testVm) {
    let test = new Test();
    test = testVm;
    this.navCtrl.push(SubTestRegistrationPage, test);
  }

  ionViewWillEnter() {
    Logger.debug("ionViewWillEnter: TeltListPage");
    this.dutil.showLoader("データを読み込んでいます...");
    this.getTests();
  }
}
