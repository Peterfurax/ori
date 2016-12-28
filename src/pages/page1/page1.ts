import { Component } from "@angular/core";
import { VideoService, AppService } from "../../app/app.service";
import { NavController } from "ionic-angular";
import { UserData } from "../../providers/user-data";
import { SqlLiteData } from "../../providers/sqlLite";

@Component({
  selector: "page-page1",
  templateUrl: "page1.html"
})
export class Page1 {

  constructor(
    public navCtrl: NavController,
    public serviceVideo: VideoService,
    public serviceApp: AppService,
    public userData: UserData,
    public storageSql: SqlLiteData
  ) {
    this.serviceApp.appVersionAll()
  }

  ca() {
    this.serviceVideo.captureVideo()

  }

  storageSqlClear() {
    this.storageSql.recreate()
  }

  sessionStorageClear() {
    this.userData.clearProfile()
  }

  pro() {
    this.serviceApp.notificationMaker()
  }

  VideoUri() {
    this.serviceVideo.getVideoUri()
  }
}