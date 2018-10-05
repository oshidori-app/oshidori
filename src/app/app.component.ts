import { timer } from 'rxjs/observable/timer';
import { AccountSigninPage } from '../pages/account-signin/account-signin';
import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalStateService } from '../providers/global-state.service';

import { HomePage } from '../pages/home/home';

import { UtilService } from '../providers/util.service';
import { Auth } from 'aws-amplify';

@Component({
  templateUrl: 'app.html',
  providers: [GlobalStateService, UtilService]
})
export class MyApp {
  rootPage: any = null;
  
  public showSplash: boolean = true;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    let globalActions = () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false)
    };

    platform.ready().then(() => {
      Auth.currentAuthenticatedUser()
        .then(() => { this.rootPage = HomePage; })
        .catch(() => { this.rootPage = AccountSigninPage; })
        .then(() => globalActions());
    });
  }
}