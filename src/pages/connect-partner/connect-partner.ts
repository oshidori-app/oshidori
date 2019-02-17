import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { NavController } from 'ionic-angular';
import QRCode from 'qrcode';
import { Logger } from '../../logger';
import { AuthService } from '../../providers/auth.service';
import { DisplayUtilService } from '../../providers/display-util.service';
import { GroupRepository } from '../../repository/group.repository';

@Component({
  selector: 'connect-partner',
  templateUrl: 'connect-partner.html'
})
export class ConnectPartnerPage {

  public generated = null;
  public connectCode = null;
  public imgLoaded: boolean = false;
  private options: BarcodeScannerOptions;
  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private groupRepo: GroupRepository,
    private scanner: BarcodeScanner,
    private dutil: DisplayUtilService,
  ) { }

  async generateQRCode(val) {
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

  async onClickReadQR() {
    try {
      this.options = {
        // androidのときだけ表示
        prompt: "QRコードを読み込んでください"
      }
      const data = await this.scanner.scan(this.options);
      Logger.debug(data.text);
    } catch (err) {
      Logger.error(err);
      // 非許可の場合
      if (err.indexOf('prohibited') > -1) {
        // TODO iphoneとandoridそれぞれの設定方法を記述
        this.dutil.showAlert("カメラを起動できませんでした", "設定画面からoshidoriアプリにカメラ利用を許可してください。");
      }
    }
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
