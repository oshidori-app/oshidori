import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the KeepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-keep',
  templateUrl: 'keep.html',
})
export class KeepPage {

  keep = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.keep = navParams.get('keep');
    this.keep['description'] = '色は暖色系の色味ではなかったけれど、家族・旦那さんが好きな色味でデザインとボリュームが今まで着たドレスの中で1番'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PanelPage');
  }

}
