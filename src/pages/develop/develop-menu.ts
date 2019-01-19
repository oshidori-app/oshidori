import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Logger } from '../../logger';
import { AccountPage } from '../account/account';
import { TestListPage } from '../test-list/test-list';
import { TestRegistrationPage } from '../test-registration/test-registration';
import { TestMultiRegistrationPage } from '../test-registration/test-multi-registration';
import { KeepPage } from '../keep/keep';

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

  ionViewDidEnter(){
   Logger.debug("Develop Menu Page Loaded.")
  }
}
