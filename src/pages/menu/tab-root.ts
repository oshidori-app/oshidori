import { DevMenuPage } from '../develop/develop-menu';
import { HomePage } from '../home/home';
import { Component } from '@angular/core';

@Component({
    selector: 'tab-root',
    templateUrl: 'tab-root.html',
  })
export class TabRootPage {

    public homeTab:any ;
    public activityTab:any ;
    public settingTab:any ;

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
