import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DisplayUtilService } from '../../providers/display-util.service';
import { TestRepository } from '../../repository/test.repository';
import { AuthService } from '../../providers/auth.service';
import { Logger } from '../../logger';
import { AccountPage } from '../account/account';
import { TestListPage } from '../test-list/test-list';
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

  ionViewDidEnter(){
   Logger.debug("Develop Menu Page Loaded.")
  }
}
