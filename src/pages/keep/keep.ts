import { Component } from '@angular/core';
import { DisplayUtilService } from '../../providers/display-util.service';
import { CommentRepository } from '../../repository/comment.repository';
import { Comment } from '../../models/comment';
import { AuthService } from '../../providers/auth.service';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { KeepListPage } from '../keep-list/keep-list';
import { HomePage } from '../home/home';
import { InputKeepPage } from '../input-keep/input-keep';
import { Logger } from '../../logger';

/**
 * Generated class for the KeepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 // チャット表示用
export class CommentListVm {
  comment?: string;
  createUser?: string;
}

@IonicPage()
@Component({
  selector: 'page-keep',
  templateUrl: 'keep.html',
})

export class KeepPage {

  public commentRegistrationVm: {
    comment?: string,
  } = {};

  public keep = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private commentRepo: CommentRepository,
    private dutil: DisplayUtilService,
    private auth: AuthService
  ) {
//    this.keep = navParams.get('keep');
   this.keep['title'] = 'キープ詳細';
   this.keep['src'] = 'hoge';
   this.keep['description'] = '色は暖色系の色味ではなかったけれど、家族・旦那さんが好きな色味でデザインとボリュームが今まで着たドレスの中で1番';
  }

  // firebaseへコメントを登録
  onClickRegistration(form) {
    if (form && form.valid) {
      Logger.debug(form);

    let comment = new Comment({
      comment: this.commentRegistrationVm.comment,
    });

    this.commentRepo.add(comment)
      .then((ref) => {
        this.commentRegistrationVm.comment = '';
      })
      .catch(err => {
        this.dutil.showToast(err);
        Logger.error(err);
        return;
      });
    }
  }

  // firebaseからチャットコメント取得
  public commentListVms: CommentListVm[];
  private getComment() {
    let comment = new Comment();
    this.commentRepo.list(comment)
      .subscribe(commentList => {
        Logger.debug(commentList);
        this.commentListVms = commentList;
      });
    this.commentRegistrationVm.comment = '';
  }

  manfav: Boolean;
  manFavChange() {
    if (this.manfav == true) {
      this.manfav = false;
    } else {
      this.manfav = true;
    }
    localStorage.setItem('manfav', JSON.stringify(this.manfav));
  }

  womanfav: Boolean;
  womanFavChange() {
    if (this.womanfav == true) {
      this.womanfav = false;
    } else {
      this.womanfav = true;
    }
    localStorage.setItem('womanfav', JSON.stringify(this.womanfav));
  }

  decidestatus: Boolean;
  decideStatusChange() {
    if (this.decidestatus == true) {
      this.decidestatus = false;
    } else {
      this.decidestatus = true;
    }
    localStorage.setItem('decidestatus', JSON.stringify(this.decidestatus));
  }

  // ローカルストレージに保持(あとで消す)
  chats: { name: string }[] = [];
  chat: string;
  addChat() {
    this.chats.push({
      name: this.chat,
    });
    localStorage.setItem('chats', JSON.stringify(this.chats));
    this.chat = '';
  }

  ionViewWillEnter() {
    // firebaseからチャットを読み込む
    Logger.debug('ionViewWillEnter: Keep');
    this.dutil.showLoader('データを読み込んでいます...');
    this.getComment();

    // ローカルストレージから読み込む(あとで消す)
    if (localStorage.getItem('chats')) {
      this.chats = JSON.parse(localStorage.getItem('chats'));
    }
    if (localStorage.getItem('manfav')) {
      this.manfav = JSON.parse(localStorage.getItem('manfav'));
    }
    if (localStorage.getItem('womanfav')) {
      this.womanfav = JSON.parse(localStorage.getItem('womanfav'));
    }
    if (localStorage.getItem('decidestatus')) {
      this.decidestatus = JSON.parse(localStorage.getItem('decidestatus'));
    }
  }

  // ローカルストレージ版チャットの編集(あとで消す)
  changeComment(index: number) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          handler: () => {
            this.chats.splice(index, 1);
//            localStorage.setItem('chats', JSON.stringify(this.chats));
          },
        }, {
          text: '変更',
          handler: () => {
//            this._modifyChat(index);
          },
        }, {
          text: '閉じる',
          handler: () => {
//            console.log('Cancel clicked');
          },
        },
      ],
    });
    actionSheet.present();
  }

  _modifyComment(index: number) {
    let prompt = this.alertCtrl.create({
      inputs: [
        {
          name: 'chat',
          placeholder: 'チャット',
          value: this.chats[index].name,
        },
      ],
      buttons: [
        {
          text: '閉じる',
        },
        {
          text: '保存',
          handler: data => {
          //   this.chats[index] = {name:data.chat};
          // localStorage.setItem('chats', JSON.stringify(this.chats));
          },
        },
      ],
    });
    prompt.present();
  }

  // ローカルストレージ版チャットの編集(あとで消す)
  changeChat(index: number) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          handler: () => {
            this.chats.splice(index, 1);
            localStorage.setItem('chats', JSON.stringify(this.chats));
          },
        }, {
          text: '変更',
          handler: () => {
            this._modifyChat(index);
          },
        }, {
          text: '閉じる',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    actionSheet.present();
  }

  // ローカルストレージ版チャットの編集(あとで消す)
  _modifyChat(index: number) {
    let prompt = this.alertCtrl.create({
      inputs: [
        {
          name: 'chat',
          placeholder: 'チャット',
          value: this.chats[index].name,
        },
      ],
      buttons: [
        {
          text: '閉じる',
        },
        {
          text: '保存',
          handler: data => {
            this.chats[index] = { name: data.chat };
          localStorage.setItem('chats', JSON.stringify(this.chats));
          },
        },
      ],
    });
    prompt.present();
  }

  showMenu() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '編集',
          handler: () => {
            this.goToInputKeep();
          },
        }, {
          text: '削除',
          role: 'destructive',
          handler: () => {
            this.showConfirm();
          },
        }, {
          text: 'キャンセル',
          role: 'cancel',
        },
      ],
    });
    actionSheet.present();
  }

  // ローカルストレージ版チャットの編集(あとで消す)
  showConfirm() {
    const confirm = this.alertCtrl.create({
      message: '削除してよろしいですか?',
      buttons: [
        {
          text: 'キャンセル',
          handler: () => {
            console.log('Disagree clicked');
          },
        },
        {
          text: '削除',
          handler: () => {
            this.goToKeepList();
          },
        },
      ],
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
  ionViewDidLoad() {
    Logger.debug('ionViewDidEnter: KeepPage');
  }
}
