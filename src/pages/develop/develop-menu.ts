import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Logger } from '../../logger';
import { AccountPage } from '../account/account';
import { ConnectPartnerPage } from '../connect-partner/connect-partner';
import { KeepPage } from '../keep/keep';
import { TestListPage } from '../test-list/test-list';
import { TestMultiRegistrationPage } from '../test-registration/test-multi-registration';
import { TestRegistrationPage } from '../test-registration/test-registration';

@Component({
  selector: 'develop-menu',
  templateUrl: 'develop-menu.html',
})
export class DevMenuPage {

  constructor(public navCtrl: NavController) {
  }

  goAccountPage() {
    this.navCtrl.push(AccountPage);
  }

  goTestListPage() {
    this.navCtrl.push(TestListPage);
  }

  goTestRegistrationPage() {
    this.navCtrl.push(TestRegistrationPage);
  }

  goTestMultipleRegistrationPage() {
    this.navCtrl.push(TestMultiRegistrationPage);
  }

  goKeepPage() {
     this.navCtrl.push(KeepPage);
  }

  goConnectPartnerPage() {
    this.navCtrl.push(ConnectPartnerPage);
  }
  ionViewDidEnter() {
   Logger.debug('Develop Menu Page Loaded.');
  }
}
