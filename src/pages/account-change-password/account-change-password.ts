import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DisplayUtilService } from '../../providers/display-util.service';
@Component({
  templateUrl: 'account-change-password.html',
})

export class AccountChangePasswordPage {

  formData: {
    currentPassword?: string,
    newPassword?: string,
  } = {};

  submitted = false;

  constructor(private navCtrl: NavController, private dutil: DisplayUtilService) {
  }
  onSubmit(form) {
    this.submitted = true;

    if (form && form.valid) {
      // Auth.currentAuthenticatedUser()
      //   .then(user => {
      //     Auth.changePassword(user, this.formData.currentPassword, this.formData.newPassword)
      //       .then((data) => {
      //         let callback = () => {
      //           this.navCtrl.pop();
      //         }
      //         this.util.showAlert('パスワード変更', '新しいパスワードに変更しました。', callback);
      //       }).catch((err: Error) => {
      //         logger.error(err.message);
      //         this.util.showAlert('失敗しました', 'パスワード変更できませんでした。もう一度お試しください。', null);
      //       });
      //   }).catch(err => {
      //     logger.info(err.message);
      //     this.navCtrl.setRoot(AccountSigninPage);
      //   });
    }
  }
}
