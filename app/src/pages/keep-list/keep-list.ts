import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
//  keeplist = {};
  public keeplist = [];
  public taglist = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //this.keeplist = navParams.get('panel');
    //this.keeplist['title'] = 'ドレスだよ'

  }

  ionViewDidLoad() {
    // タグリストのデータ設定
    this.taglist = ["#ウェディングドレス","#白","#レース","#1着目","#チャペル"];

    //キープリストのデータ設定
    this.keeplist = [
        { title: "dress1", src: "assets/img/image01.jpg", description:"自分のスタイルや価値観をもち、それを反映させたライフスタイルやファッションを楽しむ女性をイメージしているらしい。",color: "danger" },
        { title: "dress2", src: "assets/img/image05.jpg", description:"上に白いオーガンジーをかぶせることによってふんわり幻想的な雰囲気になるとのこと。",color: "light" },
        { title: "dress3", src: "assets/img/image08.jpg", description:"チュール部分には花のプリントが透けコントラストが効いたデザイン。流れる小花が可愛いドレス。",color: "light" },
        { title: "dress4", src: "assets/img/image02.jpg", description:"自分のスタイルや価値観をもち、それを反映させたライフスタイルやファッションを楽しむ女性をイメージしているらしい。",color: "light" },
        { title: "dress5", src: "assets/img/image01.jpg", description:"上に白いオーガンジーをかぶせることによってふんわり幻想的な雰囲気になるとのこと。",color: "light" }
    ];
  }

  goToKeep(task) {
    this.navCtrl.push(KeepPage, {keep: task});
  }
}

