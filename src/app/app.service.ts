// declare const cordova;
import { Injectable } from "@angular/core";
import { Vibration } from "@ionic-native/vibration";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { AppVersion } from "@ionic-native/app-version";
@Injectable()

/**
 *  class AppService
 */
export class AppService {
  constructor(
    private vibration: Vibration,
    private localNotifications: LocalNotifications,
    private appVersion: AppVersion
  ) {}

  private appName: Promise<string>;
  private appPackageName: Promise<string>;
  private appVersionNumber: Promise<string>;
  private appAllInfo: {
    Names: string;
    PackageName: string;
    VersionNumber: string;
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
    this.appName = this.appVersion.getAppName();
    this.appPackageName = this.appVersion.getPackageName();
    this.appVersionNumber = this.appVersion.getVersionNumber();
    Promise.all([this.appName, this.appPackageName, this.appVersionNumber])
      .then((result:string[]) => {
        this.appAllInfo.Names = result[0];
        this.appAllInfo.PackageName = result[1];
        this.appAllInfo.VersionNumber = result[2];
      })
      .catch(err => console.error(err));
  }

  /**
   * @method notificationMaker
   * @desc natif notification and vibrate
   * @type PromiseAll
   */
  notificationMaker() {
    Promise.all([this.notification(), this.vibrate([500, 100, 500])])
      .then(() => {})
      .catch(err => console.error(err));
  }

  /**
   * @method vibrate
   * @desc natif notification and vibrate
   * @type PromiseAll
   */
  vibrate(param: any) {
    this.vibration.vibrate(param);
  }

  /**
   * [notification description]
   * @method notification
   */
  notification() {
    this.localNotifications.schedule({
      title: "Application Video",
      text: "message",
      sound: "file://assets/sound/notification_ok.mp3"
    });
  }
}
