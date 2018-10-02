import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { RankingPage } from '../ranking/ranking';
import { HomePage } from '../home/home';
import { KeepListPage } from '../keep-list/keep-list';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = RankingPage;
  tab4Root = KeepListPage;
  tabOtherPageRoot = AccountPage;

  constructor() {

  }
}
