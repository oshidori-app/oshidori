import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DisplayUtilService } from '../../providers/display-util.service';
import { TestRepository } from '../../repository/test.repository';
import { Test } from '../../models/test';
import { AuthService } from '../../providers/auth.service';
import { Logger } from '../../logger';
import { StorageService } from '../../providers/storage.service';
import { Observable } from 'rxjs';

export class TestListVm {
  title?: string
  description?: string
  downloadUrl?: Observable<string>
}

@Component({
  selector: 'page-test-list',
  templateUrl: 'test-list.html',
})
export class TestListPage {

  public testListVms: TestListVm[];

  constructor(public navCtrl: NavController, private testRepo: TestRepository, private auth: AuthService, private storage: StorageService, private dutil: DisplayUtilService) {
  }

  private getTests() {
    let user = this.auth.getUser();
    let test = new Test({
      groupId: user.uid //TODO 認証成功したらグローバル変数から取得したい
    });
    this.testRepo.getList(test)
      .subscribe(testList => {
        this.testListVms = testList;

        testList.forEach((test, i) => {
          let imgUrl =  this.storage.getDownloadURL(test.imgUrl);
          this.testListVms[i].downloadUrl = imgUrl;
        });
      });
  }

  ionViewWillEnter() {
    Logger.debug("ionViewWillEnter: TeltListPage");
    this.dutil.showLoader("データを読み込んでいます...");
    this.getTests();
    this.dutil.dismissLoader();
  }
}
