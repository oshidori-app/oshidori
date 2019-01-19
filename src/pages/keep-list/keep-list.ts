import { Task } from './../../models/task';
import { Component, NgModule } from '@angular/core';
import { DisplayUtilService } from '../../providers/display-util.service';
import { KeepRepository } from '../../repository/keep.repository';
import { Keep } from '../../models/keep';
import { AuthService } from '../../providers/auth.service';
import { Logger } from '../../logger';
import { StorageService } from '../../providers/storage.service';
import { Observable } from 'rxjs';
import { IonicImageLoader } from 'ionic-image-loader';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KeepPage } from '../keep/keep';

/**
 * Generated class for the KeepListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

export class KeepListVm {
  title?: string
  imgUrl?: string
  downloadUrl?: Observable<string>
}

//@IonicPage()
@Component({
  selector: 'page-keep-list',
  templateUrl: 'keep-list.html',
})

@NgModule({
  imports: [
    IonicImageLoader
  ]
})

export class KeepListPage {
  //public keeplist = [];
  // public taglist = [];
  public task;

  public keepListVms: KeepListVm[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private keepRepo: KeepRepository,
    private auth: AuthService,
    private storage: StorageService,
    private dutil: DisplayUtilService,
  ) {
    this.task = navParams.get('task');
  }

  private addkeeps() {
    let keepReg = new Keep({
      title: 'dress',
      imgUrl: 'content/image01.jpg'
    });
    this.keepRepo.add(keepReg)
      .then((ref) => {
        // Logger.debug(ref);
        // test.ref = ref;
        // this.testRepo.update(test);
        //this.dutil.showToast('登録しました');
      })
      .catch(err => {
        this.dutil.showToast(err);
        Logger.error(err);
        return;
      });
  }

  private getKeeps() {
    let keep = new Keep();
    this.keepRepo.list(keep).subscribe(keepList => {
      Logger.debug(keepList);
      this.keepListVms = keepList;
      keepList.forEach((keep, i) => {
        let imageURL = this.storage.getDownloadURL(keep.imgUrl);
        this.keepListVms[i].downloadUrl = imageURL;
        Logger.debug(imageURL);
        Logger.debug(keep.imgUrl);
        Logger.debug(this.keepListVms[i].downloadUrl);
      });
    });
  }

  // ionViewDidLoad() {
  //   this.addkeeps();
  //   this.getKeeps();
  // }

  ionViewWillEnter() {
    this.dutil.showLoader("データを読み込んでいます...");
    this.addkeeps();
    this.getKeeps();
  }

  // ionViewDidLoad() {
  //   // タグリストのデータ設定
  //   //this.taglist = ["#ウェディングドレス","#白","#レース","#1着目","#チャペル"];

  //   //キープリストのデータ設定
  //   let keeps = [
  //       { title: "dress1", src: "assets/img/image01.jpg", class:"ribbon" },
  //       { title: "dress2", src: "assets/img/image04.jpg", class:"noRibbon" },
  //       { title: "dress3", src: "assets/img/image08.jpg", class: "noRibbon" },
  //       { title: "dress4", src: "assets/img/image02.jpg", class: "noRibbon" },
  //       { title: "dress9", src: "assets/img/image09.jpg", class: "noRibbon" },
  //       { title: "dress7", src: "assets/img/image07.jpg", class: "noRibbon" },
  //       { title: "dress1", src: "assets/img/image01.jpg", class: "noRibbon" },
  //       { title: "dress2", src: "assets/img/image04.jpg", class: "noRibbon" },
  //       { title: "dress3", src: "assets/img/image08.jpg", class: "noRibbon" },
  //       { title: "dress4", src: "assets/img/image02.jpg", class: "noRibbon" },
  //       { title: "dress9", src: "assets/img/image09.jpg", class: "noRibbon" },
  //       { title: "dress7", src: "assets/img/image07.jpg", class: "noRibbon" }
  //     ];

  //   let xNum = 2;  
  //       // 表示用に配列を整形
  //       let ret = [];
  //       for(let i = 0; i < Math.ceil(keeps.length / xNum); i++){
  //         var index = i * xNum;
  //         ret.push(keeps.slice(index, index + xNum));
  //       }
  //    this.keeplist = ret;

  // }

  goToKeep(task) {
    // this.navCtrl.push(KeepPage, { keep: task });
  }
}

//export class SharedModule {}

