import { Task } from './../../models/task';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { KeepPage } from '../keep/keep';

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
  public keeplist = [];
  public taglist = [];
  public task;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
    ) {
      this.task = navParams.get('task');
    }

  ionViewDidLoad() {
    // タグリストのデータ設定
    //this.taglist = ["#ウェディングドレス","#白","#レース","#1着目","#チャペル"];

    //キープリストのデータ設定
    let keeps = [
        { title: "dress1", src: "assets/img/image01.jpg", class:"ribbon" },
        { title: "dress2", src: "assets/img/image04.jpg", class:"noRibbon" },
        { title: "dress3", src: "assets/img/image08.jpg", class: "noRibbon" },
        { title: "dress4", src: "assets/img/image02.jpg", class: "noRibbon" },
        { title: "dress9", src: "assets/img/image09.jpg", class: "noRibbon" },
        { title: "dress7", src: "assets/img/image07.jpg", class: "noRibbon" },
        { title: "dress1", src: "assets/img/image01.jpg", class: "noRibbon" },
        { title: "dress2", src: "assets/img/image04.jpg", class: "noRibbon" },
        { title: "dress3", src: "assets/img/image08.jpg", class: "noRibbon" },
        { title: "dress4", src: "assets/img/image02.jpg", class: "noRibbon" },
        { title: "dress9", src: "assets/img/image09.jpg", class: "noRibbon" },
        { title: "dress7", src: "assets/img/image07.jpg", class: "noRibbon" }
      ];

    let xNum = 2;  
        // 表示用に配列を整形
        let ret = [];
        for(let i = 0; i < Math.ceil(keeps.length / xNum); i++){
          var index = i * xNum;
          ret.push(keeps.slice(index, index + xNum));
        }
     this.keeplist = ret;

  }

  goToKeep(task) {
    this.navCtrl.push(KeepPage, {keep: task});
  }
}

