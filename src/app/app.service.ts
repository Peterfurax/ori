declare const cordova
import { Injectable } from "@angular/core"
import { Vibration } from '@ionic-native/vibration';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AppVersion } from '@ionic-native/app-version';
@Injectable()

/**
 *  class AppService
 */
export class AppService {
  constructor(
    private vibration: Vibration,
    private localNotifications: LocalNotifications,
    private appVersion: AppVersion
  ) { }

  private appName: Promise<string>;
  private appPackageName: Promise<string>;
  private appVersionNumber: Promise<string>;
  private appAllInfo: {
    Names: string,
    PackageName: string,
    VersionNumber: string
  } = {
    Names: "",
    PackageName: "",
    VersionNumber: ""
  };
  /**
   * @name appVersionAll
   * @desc Retrieve app info from AppVersion ionic-native
   * @type PromiseAll
   * @return type:Array [TubeR, com.lesechos.tuber, "0.0.1"] == [AppName, PackageName, VersionNumber]
   */
  appVersionAll() {
    this.appName = this.appVersion.getAppName()
    this.appPackageName = this.appVersion.getPackageName()
    this.appVersionNumber = this.appVersion.getVersionNumber()
    Promise.all([this.appName, this.appPackageName, this.appVersionNumber]).then(
      data => {
        this.appAllInfo.Names = data[0]
        this.appAllInfo.PackageName = data[1]
        this.appAllInfo.VersionNumber = data[2]
      },
      err => { })
  }

  /**
   * [notificationMaker description]
   * @method notificationMaker
   * @return {[type]}          [description]
   */
  notificationMaker() {
    this.notification()
    this.vibrate([500, 500, 500])
  }

  /**
   * [vibrate description]
   * @method vibrate
   * @param  {any}    param [description]
   * @return {[type]}       [description]
   */
  vibrate(param: any) {
    this.vibration.vibrate(param)
  }

  /**
   * [notification description]
   * @method notification
   * @return {[type]}     [description]
   */
  notification() {
    this.localNotifications.schedule({
      title: "Application Video",
      text: "message",
      sound: "file://assets/sound/notification_ok.mp3"
    })
  }

}
