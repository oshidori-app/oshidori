import { timer } from 'rxjs/observable/timer';
import { AccountSigninPage } from '../pages/account-signin/account-signin';
import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { AngularFireAuth } from '@angular/fire/auth';
import { AccountConfirmationCodePage } from '../pages/account-confirmation-code/account-confirmation-code';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;

  public showSplash: boolean = true;

  constructor(private platform: Platform, private statusBar: StatusBar, private afAuth: AngularFireAuth, private splashScreen: SplashScreen) {
    let globalActions = () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(1000).subscribe(() => this.showSplash = false)
    };

    platform.ready().then(() => {
      const unsubscribe = afAuth.auth.onAuthStateChanged(user => {
        let page;
        if (!user) {
          page = AccountSigninPage;
          unsubscribe();
        } else {
          // メール未検証の場合は確認画面
          if (!user.emailVerified) {
            page = AccountConfirmationCodePage;
            unsubscribe();
          } else {
            page = HomePage;
            unsubscribe();
          }
        }
        this.rootPage = page;
      });
    })
      .then(() => globalActions());
  }
}