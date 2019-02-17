import { Component } from '@angular/core';

import { DevMenuPage } from '../develop/develop-menu';
import { HomePage } from '../home/home';

@Component({
    selector: 'tab-root',
    templateUrl: 'tab-root.html',
  })
export class TabRootPage {

    homeTab: any ;
    activityTab: any ;
    settingTab: any ;

    constructor() {
        this.homeTab = HomePage;
        this.activityTab = null;
        this.settingTab = DevMenuPage;
    }

    ionViewDidEnter() {
    }

    ionViewDidLeave() {
    }
}
