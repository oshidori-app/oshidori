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
    this.keep['title'] = 'キープ詳細'
    this.keep['description'] = '色は暖色系の色味ではなかったけれど、家族・旦那さんが好きな色味でデザインとボリュームが今まで着たドレスの中で1番'
  }

  manfav: Boolean;
  manFavChange(){
    if (this.manfav == true)
    {
      this.manfav = false;
    }
    else
    {
      this.manfav = true;
    }
    localStorage.setItem('manfav', JSON.stringify(this.manfav))
  }

  womanfav: Boolean;
  womanFavChange(){
    if (this.womanfav == true)
    {
      this.womanfav = false;
    }
    else
    {
      this.womanfav = true;
    }
    localStorage.setItem('womanfav', JSON.stringify(this.womanfav))
  }

  decidestatus: Boolean;
  decideStatusChange(){
    if (this.decidestatus == true)
    {
      this.decidestatus = false;
    }
    else
    {
      this.decidestatus = true;
    }
    localStorage.setItem('decidestatus', JSON.stringify(this.decidestatus))
  }

  chats: { name: string }[] = [];
  chat: string;
  addChat(){
    this.chats.push({
      name: this.chat
    });
    localStorage.setItem('chats', JSON.stringify(this.chats))
    this.chat = '';
  }

  ionViewWillEnter(){
    if(localStorage.getItem('chats')){
      this.chats = JSON.parse(localStorage.getItem('chats'));
    }
    if(localStorage.getItem('manfav')){
      this.manfav = JSON.parse(localStorage.getItem('manfav'));
    }
    if(localStorage.getItem('womanfav')){
      this.womanfav = JSON.parse(localStorage.getItem('womanfav'));
    }
    if(localStorage.getItem('decidestatus')){
      this.decidestatus = JSON.parse(localStorage.getItem('decidestatus'));
    }
  }

  changeChat(index: number){
    let actionSheet = this.actionSheetCtrl.create({
      buttons:[
        {
          text: '削除',
          role: 'destructive',
          handler:() => {
            this.chats.splice(index, 1)
            localStorage.setItem('chats', JSON.stringify(this.chats));
          }
        },{
          text: '変更',
          handler:() => {
            this._modifyChat(index);
          }
        },{
          text: '閉じる',
          handler:() => {
            console.log('Cancel clicked');
          }
        }
      ]
    })
    actionSheet.present();
  }
  _modifyChat(index: number){
    let prompt = this.alertCtrl.create({
      inputs:[
        {
          name: 'chat',
          placeholder: 'チャット',
          value: this.chats[index].name
        }
      ],
      buttons:[
        {
          text: '閉じる'
        },
        {
          text: '保存',
          handler: data =>{
            this.chats[index] = {name:data.chat};
          localStorage.setItem('chats', JSON.stringify(this.chats));
          }
        }
      ]
    })
    prompt.present();
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeepPage');
  }

  showMenu() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
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
