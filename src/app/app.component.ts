import { AccountConfirmationCodePage } from './../pages/account-confirmation-code/account-confirmation-code';
import { AccountSignupPage } from './../pages/account-signup/account-signup';
import { AccountSigninPage } from '../pages/account-signin/account-signin';
import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { UserLoginService, UserRegistrationService, LocalStorage } from '../providers/account-management.service';
import { GlobalStateService } from '../providers/global-state.service';
import { UtilService } from '../providers/util.service';
import { Logger } from '../providers/logger.service';
import { Auth } from 'aws-amplify';

@Component({
  templateUrl: 'app.html',
  providers: [UserRegistrationService, UserLoginService, LocalStorage, GlobalStateService, UtilService, Logger]
})
export class MyApp {
  rootPage: any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public config: Config) {
    let globalActions = function () {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    };

    platform.ready().then(() => {
      Auth.currentAuthenticatedUser()
        .then(() => { this.rootPage = HomePage; })
        .catch(() => { this.rootPage = AccountSigninPage; })
        .then(() => globalActions());
    });
  }
}