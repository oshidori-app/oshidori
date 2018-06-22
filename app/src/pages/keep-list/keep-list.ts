import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PanelPage } from '../panel/panel';
/**
 * Generated class for the KeepListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-keep-list',
  templateUrl: 'keep-list.html',
})
export class KeepListPage {
//  keeplist = {};
  public keeplist = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.keeplist = navParams.get('panel'); 
    //this.keeplist['title'] = 'ドレスだよ'

  }
 
  ionViewDidLoad() {
    //キープリストのデータ設定
    this.keeplist = [
        { title: "dress1", src: "assets/img/image01.jpg", description:"コメント1",edFix: "true" },
        { title: "dress2", src: "assets/img/image02.jpg", description:"コメント2",edFix: "false" },
        { title: "dress3", src: "assets/img/image01.jpg", description:"コメント3",edFix: "false" },
        { title: "dress4", src: "assets/img/image02.jpg", description:"コメント4",edFix: "false" },
        { title: "dress5", src: "assets/img/image01.jpg", description:"コメント5",edFix: "false" }
    ];
  }

  goToPanel(task){
    this.navCtrl.push(PanelPage, {panel: task});
  }
}

