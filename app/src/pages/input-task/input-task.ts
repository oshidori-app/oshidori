import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InputTaskPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-input-task',
  templateUrl: 'input-task.html',
})
export class InputTaskPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public event = {
    month: new Date().toISOString(),
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InputTaskPage');
  }

  /*
  goToPanelPage(Home1){
    this.navCtrl.push(HomePage, {Home1: Home1});
   }
  */

}
