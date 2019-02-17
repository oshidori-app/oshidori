import { Component, NgModule } from '@angular/core';
import { NavController, DateTime } from 'ionic-angular';
import { DisplayUtilService } from '../../providers/display-util.service';
import { TestRepository } from '../../repository/test.repository';
import { Test } from '../../models/test';
import { AuthService } from '../../providers/auth.service';
import { Logger } from '../../logger';
import { StorageService } from '../../providers/storage.service';
import { Observable, Subscription } from 'rxjs';
import { IonicImageLoader } from 'ionic-image-loader';
import { SubTestRegistrationPage } from '../test-registration/sub-test-registration';

export class TestListVm {
  title?: string
  description?: string
  downloadUrl?: Observable<string>
  refPath?: string
  updated?: DateTime
  imgLoaded?: boolean
}

@Component({
  selector: 'page-test-list',
  templateUrl: 'test-list.html',
})
export class TestListPage {

  public testListVms: TestListVm[];
  private listSubscription: Subscription;

  public fakeList: Array<any> = new Array(10);

  constructor(public navCtrl: NavController, private testRepo: TestRepository, private auth: AuthService, private storage: StorageService, private dutil: DisplayUtilService) {
  }

  private getTests() {
    let test = new Test();
    this.listSubscription = this.testRepo.list(test)
      .subscribe(testList => {
        this.testListVms = testList;
        testList.forEach((test, i) => {
          let imgUrl = this.storage.getDownloadURL(test.imgUrl);
          this.testListVms[i].downloadUrl = imgUrl;
          this.testListVms[i].updated = new Date().getTime() + test.updated.seconds;
          this.testListVms[i].refPath = test.ref.path;
          this.testListVms[i].imgLoaded = false;
        });
      });
  }

  public onClickToSubCollection(testVm) {
    let test = new Test();
    test = testVm;
    this.navCtrl.push(SubTestRegistrationPage, test);
  }

  public onImageLoaded(index) {
    Logger.debug("loaded: " + index);
    this.testListVms[index].imgLoaded = true;
  }

  ionViewWillEnter() {
    Logger.debug("ionViewWillEnter: TeltListPage");
    this.getTests();
  }

  ionViewDidLeave() {
    if (this.listSubscription) this.listSubscription.unsubscribe();
  }
}
