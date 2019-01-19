import { Component, NgModule } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DisplayUtilService } from '../../providers/display-util.service';
import { TestRepository } from '../../repository/test.repository';
import { Test } from '../../models/test';
import { AuthService } from '../../providers/auth.service';
import { Logger } from '../../logger';
import { StorageService } from '../../providers/storage.service';
import { Observable } from 'rxjs';
import { IonicImageLoader } from 'ionic-image-loader';

export class TestListVm {
  title?: string
  description?: string
  downloadUrl?: Observable<string>
}

@Component({
  selector: 'page-test-list',
  templateUrl: 'test-list.html',
})
@NgModule({
  imports:[
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
          let imgUrl = this.storage.getDownloadURL(test.imgUrl);
            this.testListVms[i].downloadUrl = imgUrl;
        });
      });
  }

  ionViewWillEnter() {
    Logger.debug("ionViewWillEnter: TeltListPage");
    this.dutil.showLoader("データを読み込んでいます...");
    this.getTests();
  }
}
