import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import QRCode from 'qrcode';
import { Logger } from '../../logger';
import { AuthService } from '../../providers/auth.service';
import { GroupRepository } from '../../repository/group.repository';
import { generate } from 'rxjs';

@Component({
  selector: 'connect-partner',
  templateUrl: 'connect-partner.html'
})
export class ConnectPartnerPage {

  public code = 'some sample string';
  public generated = null;
  public connectCode = null;
  public imgLoaded: boolean = false;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private groupRepo: GroupRepository
  ) { }

  generateQRCode(val) {
    Logger.debug("generateQRcode")

    const qrcode = QRCode;
    qrcode.toDataURL(val, { errorCorrectionLevel: 'H' },
      (err, url) => {
        this.generated = url;
        if (err) {
          Logger.error(err);
        }
      });
  }

  async getGroup() {
    let groupRef: string = await this.auth.getGroupRef();
    Logger.debug(groupRef);
    const findSubscription = this.groupRepo.find(groupRef).subscribe(group => {
      // サインアップ時に生成したコードからQRを生成
      this.generateQRCode(group.connectCode);
      this.connectCode = group.connectCode;
      findSubscription.unsubscribe();
    })
  }

  ionViewWillEnter() {
    Logger.debug("ionViewWillEnter: ConnectPartnerPage");
    this.getGroup();
  }

  onImageLoaded(index) {
    Logger.debug("loaded: " + index);
    this.imgLoaded = true;
  }
}
