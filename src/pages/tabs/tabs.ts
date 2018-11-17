import { Component } from '@angular/core';

import { RankingPage } from '../ranking/ranking';
import { HomePage } from '../home/home';
import { KeepListPage } from '../keep-list/keep-list';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab3Root = RankingPage;
  tab4Root = KeepListPage;
  tabOtherPageRoot = AccountPage;

  constructor() {

  }
}
