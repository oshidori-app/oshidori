import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';
import { Config, Platform } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';

import { Logger } from '../logger';
import { AccountConfirmationCodePage } from '../pages/account-confirmation-code/account-confirmation-code';
import { AccountSigninPage } from '../pages/account-signin/account-signin';
import { TabRootPage } from '../pages/menu/tab-root';
import { AppInitializerService } from '../providers/app-initializer.service';
import { AuthService } from '../providers/auth.service';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage: any = null;

  showSplash = true;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private auth: AuthService,
    private clientStorage: Storage,
    private appInitializer: AppInitializerService,
    private splashScreen: SplashScreen
  ) {
    Logger.debug('application started. app.component.ts constructor called.');
    const globalActions = () => {
      Logger.debug('@ globalActions function');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false);
    };

    platform.ready().then(() => {
      // TODO auth.serviceに切り出し
      const unsubscribe = this.auth.onAuthStateChanged(user => {
        // 未登録、未認証状態や、更新トークン切れなどのとき
        if (!user) {
          // ローカルストレージに残っている参照も削除する
          this.clientStorage.remove('groupRef')
            .then(() => {
              Logger.debug('groupRef deleted.');
            })
            .catch(err => Logger.error(err))
            .then(() => {
              this.rootPage = AccountSigninPage;
            });
        } else {
          // メール未検証の場合は確認画面
          if (!user.emailVerified) {
            this.rootPage = AccountConfirmationCodePage;
          } else {
            // 自身のグループへの参照を取得する
            this.appInitializer.restoreGroupReference()
              .then(() => this.rootPage = TabRootPage);
          }
        }
        unsubscribe();
      });
    })
      .then(() => globalActions());
  }
}
