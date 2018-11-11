import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DisplayUtilService } from '../../providers/display-util.service';
import { TestRepository } from '../../repository/test.repository';
import { Logger } from '../../providers/logger.service';
import { Test } from '../../models/test';
import { AuthService } from '../../providers/auth.service';

export class TestListVm {
  title?: string
  description?: string
}

@Component({
  selector: 'page-test-list',
  templateUrl: 'test-list.html',
})
export class TestListPage {

  public testListVms: TestListVm[];

  constructor(public navCtrl: NavController, private testRepo: TestRepository, private auth: AuthService, private dutil: DisplayUtilService) {
  }

  private getTests() {
    let user = this.auth.getUser();
    let test = new Test({
      groupId: user.uid //TODO 認証成功したらグローバル変数から取得したい
    });
    this.testRepo.getList(test)
      .subscribe(data => {
        this.testListVms = data;
      });
  }

  ionViewWillEnter() {
    this.getTests();
  }
}
