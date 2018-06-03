import { Injectable } from "@angular/core";
import { AppVersion } from "@ionic-native/app-version";
import { AppAllInfo } from "../app/app.interface";

/**
 *  class AppService
 */
@Injectable()
export class AppService {
  constructor(private appVersion: AppVersion) {
    this.appVersionAll();
  }

  /**
   * Retrieve app info from AppVersion ionic-native
   * @name appVersionAll
   * @memberof AppService
   * @return Object [TubeR, com.lesechos.tuber, "0.0.1"] == [AppName, PackageName, VersionNumber]
   */
  appAllInfo: AppAllInfo;
  appVersionAll() {
    Promise.all([
      this.appVersion.getAppName(),
      this.appVersion.getPackageName(),
      this.appVersion.getVersionCode(),
      this.appVersion.getVersionNumber()
    ])
      .then((result: string[]) => {
        this.appAllInfo.Names = result[0];
        this.appAllInfo.PackageName = result[1];
        this.appAllInfo.VersionCode = result[2];
        this.appAllInfo.VersionNumber = result[3];
      })
      .catch((err: any) => console.error(err));
  }
}
