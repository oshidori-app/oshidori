import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { KeepListPage } from '../keep-list/keep-list'
import { HomePage } from '../home/home'
import { InputKeepPage } from '../input-keep/input-keep';

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
  ) {
    this.keep = navParams.get('keep');
    this.keep['description'] = '色は暖色系の色味ではなかったけれど、家族・旦那さんが好きな色味でデザインとボリュームが今まで着たドレスの中で1番'
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeepPage');
  }

  showMenu() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '決定',
          handler: () => {
            this.goToHome();
          }
        },{
          text: '編集',
          handler: () => {
            this.goToInputKeep();
          }
        },{
          text: '削除',
          role: 'destructive',
          handler: () => {
            this.showConfirm()
          }
        },{
          text: 'キャンセル',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      message: '削除してよろしいですか?',
      buttons: [
        {
          text: 'キャンセル',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '削除',
          handler: () => {
            this.goToKeepList();
          }
        }
      ]
    });
    confirm.present();
  }

  goToHome() {
    this.navCtrl.push(HomePage);
  }

  goToKeepList() {
    this.navCtrl.push(KeepListPage);
  }

  goToInputKeep() {
    this.navCtrl.push(InputKeepPage);
  }
}
