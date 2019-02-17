import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Logger } from '../logger';
import { AuthService } from './auth.service';
import { UserRepository } from '../repository/user.repository';
import { Subject } from 'rxjs';

@Injectable()
export class AppInitializerService {

  constructor(
    private auth: AuthService,
    private userRepo: UserRepository,
    private clientStorage: Storage) {
    Logger.debug('AppInitializerService');
  }

  /**
   * 自身のグループへの参照を復元する
   *
   * @memberof AppInitializerService
   */
  async restoreGroupReference(): Promise<any> {
    try {
      let ref = await this.clientStorage.get('groupRef');
      // ローカルストレージにある場合は、それを使用
      if (ref) {
        Logger.debug('use localstorage groupRef:' + ref);
        return;
      }

      let uid = this.auth.getUser().uid;
      Logger.debug('not exists groupRef');
      // 参照がクライアントストレージにない場合。アプリ再インストール。サインアップを別端末でしたなど。
      // firebaseのuidからfirestoreのユーザ情報をたどり、自身のグループへの参照を取得する
      if (!ref || ref == '') {
        ref = 'groups/' + uid + '/users/' + uid;
      }

      const user = await this.userRepo.find(ref);
      const result = await this.clientStorage.set('groupRef', user.groupRef.path);
      Logger.debug('client storage saved. groupRef:' + result);
      Logger.debug('restore completed.');
    } catch (err) {
      Logger.error(err);
    }
  }
}
