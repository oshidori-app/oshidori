import { Component, NgModule } from '@angular/core';
import { DisplayUtilService } from '../../providers/display-util.service';
import { KeepRepository } from '../../repository/keep.repository';
import { Keep } from '../../models/keep';
import { Logger } from '../../logger';
import { StorageService } from '../../providers/storage.service';
import { Observable, Subscription } from 'rxjs';
import { IonicImageLoader } from 'ionic-image-loader';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { KeepPage } from '../keep/keep';
import { IonicPageModule } from 'ionic-angular';

/**
 * Generated class for the KeepListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

export class KeepVm {
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
  declarations: [
    KeepListPage
  ],
  imports: [
    IonicPageModule.forChild(KeepListPage),
    IonicImageLoader
  ]
})

export class KeepListPage {

  public task;

  public keepVmInDL: KeepVm[];
  public keepListVm: (KeepVm[])[];

  private listSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private keepRepo: KeepRepository,
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
      })
      .catch(err => {
        this.dutil.showToast(err);
        Logger.error(err);
        return;
      });
  }

  private getKeeps() {

    let keep = new Keep({
      parentRef: this.task
    });

    Logger.debug('keep 　一覧');
    Logger.debug(keep);
    this.listSubscription = this.keepRepo.list(keep).subscribe(keepList => {
      Logger.debug(keepList);

      // 一旦keepVmInDLに格納して、downloadUrlを付与
      this.keepVmInDL = keepList;
      keepList.forEach((keep, i) => {
        let imageURL = this.storage.getDownloadURL(keep.imgUrl);
        this.keepVmInDL[i].downloadUrl = imageURL;
      });

      // 表示用に配列を整形
      let xNum = 2;
      let ret = [];
      for (let i = 0; i < Math.ceil(this.keepVmInDL.length / xNum); i++) {
        var index = i * xNum;
        ret.push(this.keepVmInDL.slice(index, index + xNum));
      }
      this.keepListVm = ret;

    });
  }

  ionViewWillEnter() {
    this.dutil.showLoader("データを読み込んでいます...");
    //this.addkeeps();
    this.getKeeps();
  }

  ionViewDidLeave() {
    if (this.listSubscription) this.listSubscription.unsubscribe();
  }

  goToKeep(keep) {
    this.navCtrl.push(KeepPage, { keep: keep });
  }

}

