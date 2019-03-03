import { Task } from './../../models/task';
import { Component, NgModule } from '@angular/core';
import { DisplayUtilService } from '../../providers/display-util.service';
import { KeepRepository } from '../../repository/keep.repository';
import { TaskRepository } from '../../repository/task.repository';
import { Keep } from '../../models/keep';
import { CommentRepository } from '../../repository/comment.repository';
import { Comment } from '../../models/comment';
import { AuthService } from '../../providers/auth.service';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { KeepListPage } from '../keep-list/keep-list';
import { HomePage } from '../home/home';
import { InputKeepPage } from '../input-keep/input-keep';
import { Logger } from '../../logger';
import { StorageService } from '../../providers/storage.service';
import { Observable, Subscription } from 'rxjs';
import { IonicImageLoader } from 'ionic-image-loader';
import { IonicPageModule } from 'ionic-angular';

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

@NgModule({
  declarations: [
    KeepPage,
  ],
  imports: [
    IonicPageModule.forChild(KeepPage),
    IonicImageLoader,
  ],
})

export class KeepPage {

  public KeepVm: {
    title?: string
    imgUrl?: string
    downloadUrl?: Observable<string>,
  } = {};

  public commentRegistrationVm: {
    comment?: string,
  } = {};

  public taskRegistrationVm: {
    task?: string,
  } = {};

  public keep;
  public task;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private commentRepo: CommentRepository,
    private dutil: DisplayUtilService,

    private storage: StorageService,
    private keepRepo: KeepRepository,
    private taskRepo: TaskRepository,
    private auth: AuthService
  ) {
    this.keep = navParams.get('keep');
    this.task = navParams.get('task');
  }

  private getKeep() {
    let keep = new Keep({
      parentRef: this.keep,
    });
    this.KeepVm.downloadUrl = this.storage.getDownloadURL(this.keep.imgUrl);

    let task = new Task({
      parentRef: this.task,
    });
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
    let task = new Task({
      parentRef: this.task,
    });
    task.imgUrl = this.keep.imgUrl;
    Logger.debug('taskの内容');
    Logger.debug(task);
    this.taskRepo.update(task);
  }

 ionViewWillEnter() {
    // firebaseからチャットを読み込む
    Logger.debug('ionViewWillEnter: Keep');
    this.dutil.showLoader('データを読み込んでいます...');
    this.getKeep();
    this.getComment();
  }

  // ローカルストレージ版チャットの編集(あとで消す)
  changeComment(index: number) {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          handler: () => {
//            this.chats.splice(index, 1);
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
//          value: this.chats[index].name,
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
//            this.chats.splice(index, 1);
//            localStorage.setItem('chats', JSON.stringify(this.chats));
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
//          value: this.chats[index].name,
        },
      ],
      buttons: [
        {
          text: '閉じる',
        },
        {
          text: '保存',
          handler: data => {
//          this.chats[index] = { name: data.chat };
//          localStorage.setItem('chats', JSON.stringify(this.chats));
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
