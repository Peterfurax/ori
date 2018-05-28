import { Injectable } from "@angular/core";
import { AppVersion } from "@ionic-native/app-version";
@Injectable()

/**
 *  class AppService
 */
export class AppService {
  appName: Promise<string>;
  appPackageName: Promise<string>;
  appVersionCode: Promise<string>;
  appVersionNumber: Promise<string>;
  appAllInfo: {
    Names: string;
    PackageName: string;
    VersionCode: string;
    VersionNumber: string;
  } = {
    Names: null,
    PackageName: null,
    VersionCode: null,
    VersionNumber: null
  };

  constructor(private appVersion: AppVersion) {
    this.appVersionAll();
  }

  /**
   * @name appVersionAll
   * @desc Retrieve app info from AppVersion ionic-native
   * @type PromiseAll
   * @return type:Array [TubeR, com.lesechos.tuber, "0.0.1"] == [AppName, PackageName, VersionNumber]
   */
  appVersionAll() {
    this.appName = this.appVersion.getAppName();
    this.appPackageName = this.appVersion.getPackageName();
    this.appVersionCode = this.appVersion.getVersionCode();
    this.appVersionNumber = this.appVersion.getVersionNumber();
    Promise.all([
      this.appName,
      this.appPackageName,
      this.appVersionCode,
      this.appVersionNumber
    ])
      .then((result: string[]) => {
        this.appAllInfo.Names = result[0];
        this.appAllInfo.PackageName = result[1];
        this.appAllInfo.VersionCode = result[2];
        this.appAllInfo.VersionNumber = result[3];
      })
      .catch(err => console.error(err));
  }
}
