import { timer } from 'rxjs/observable/timer';
import { AccountSigninPage } from '../pages/account-signin/account-signin';
import { Component } from '@angular/core';
import { Config, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AccountConfirmationCodePage } from '../pages/account-confirmation-code/account-confirmation-code';
import { Logger } from '../logger';
import { Storage } from '@ionic/storage';
import { AuthService } from '../providers/auth.service';
import { AppInitializerService } from '../providers/app-initializer.service';
import { TabRootPage } from '../pages/menu/tab-root';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;

  public showSplash: boolean = true;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private auth: AuthService,
    private clientStorage: Storage,
    private appInitializer: AppInitializerService,
    private splashScreen: SplashScreen
  ) {
    Logger.debug("application started. app.component.ts constructor called.");
    let globalActions = () => {
      Logger.debug("@ globalActions function");
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