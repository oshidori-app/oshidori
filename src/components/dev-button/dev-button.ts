import { NgModule, Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Logger } from '../../logger';
import { DevMenuPage } from '../../pages/develop/develop-menu';

@Component({
  selector: 'dev-button',
  templateUrl: 'dev-button.html'
})
export class DevButtonComponent {

  constructor(private navCtrl: NavController){}

  goDevMenu() {
    this.navCtrl.push(DevMenuPage);
  };

  ionViewDidLoad(){
    Logger.debug("This is testing button For Development.")
  }
}
