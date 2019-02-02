import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import QRCode from 'qrcode';
import { Logger } from '../../logger';
import { AuthService } from '../../providers/auth.service';
import { GroupRepository } from '../../repository/group.repository';
import { QRScannerStatus, QRScanner } from '@ionic-native/qr-scanner';

@Component({
  selector: 'connect-partner',
  templateUrl: 'connect-partner.html'
})
export class ConnectPartnerPage {

  public generated = null;
  public connectCode = null;
  public imgLoaded: boolean = false;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private groupRepo: GroupRepository,
    private qrScanner: QRScanner
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

  onClickReadQR() {
    Logger.debug(this.qrScanner.prepare());
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      Logger.debug(status);
       if (status.authorized) {
         // camera permission was granted
  
         // start scanning
         let scanSub = this.qrScanner.scan().subscribe((text: string) => {
           console.log('Scanned something', text);
  
           this.qrScanner.hide(); // hide camera preview
           scanSub.unsubscribe(); // stop scanning
         });
  
       } else if (status.denied) {
         // camera permission was permanently denied
         // you must use QRScanner.openSettings() method to guide the user to the settings page
         // then they can grant the permission from there
       } else {
         // permission was denied, but not permanently. You can ask for permission again at a later time.
       }
    })
    .catch((e: any) => console.log('Error is', e));

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
