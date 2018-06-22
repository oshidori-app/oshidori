import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { GlobalStateService } from '../../providers/global-state.service';
import { IamAuthorizerClient } from "../../providers/oshidori-api.service";
import { Logger } from '../../providers/logger.service';

@Component({
  templateUrl: 'keep-add-dev.html',
})

export class KeepAddDevPage {
  tabsPage = TabsPage;

  public apiresult: any;
  public formData = {
    name: "",
    title: "",
    description: "",
    imageUrl: "https://s3.amazonaws.com/spacefinder-public-image-repository/building.png",
    eval: ""
  };

  submitted: boolean = false;
  loader: any;

  onSubmit(form) {
    this.submitted = true;
    if (form && form.valid) {
      this.addKeep(form);
    }
  }

  addKeep(form) {
    this.submitted = true;
    if (form && this.formData.title) {

      // 呼出先でモデル型引数指定をしている
      // コンポーネント側でモデルインタフェースを実装する必要はない
      let keep = {
        keepId: `${(new Date()).getTime()}`,
        name: this.formData.title,
        title: this.formData.title,
        description: this.formData.description,
        imageUrl: this.formData.imageUrl,
        eval: {
          str_a: "a test",
          str_b: "b test",
          array: [1, 2, 3],
          obj: { aa: 1 }
        },
        userId: `${(new Date()).getTime()}`,
        talkId: `${(new Date()).getTime()}`,
        taskId: `${(new Date()).getTime()}`
      };

      this.globals.displayLoader("Adding...");
      // clientはIamAuthorizerClientを使用してください。
      this.client.getClient().keppsList("234x19a").subscribe(
        (data) => {
          this.globals.dismissLoader();
          this.globals.displayToast(`正常に追加しました`);
          this.apiresult = data;
        },
        (err) => {
          this.globals.dismissLoader();
          this.globals.displayAlert('エラー', 'コンソール見て');
          console.error(err);
        }

      );
    }
  }

  constructor(public navCtrl: NavController, private globals: GlobalStateService, private client: IamAuthorizerClient) {
  }

  ionViewDidEnter() {
    Logger.banner("(開発)キープ追加");
  }
}
