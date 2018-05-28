import { Component } from "@angular/core";
import { AppService } from "../../app/app.service";
import { VideoService } from "../../app/video.service";
import { NavController } from "ionic-angular";
import { UserData } from "../../providers/user-data";
import { SqlLiteData } from "../../providers/sqlLite";
import { NotificationService } from "../../app/notification.service";

@Component({
  selector: "page-About",
  templateUrl: "About.html"
})
export class About {
  constructor(
    private notificationService: NotificationService,
    private navCtrl: NavController,
    private serviceVideo: VideoService,
    private serviceApp: AppService,
    private userData: UserData,
    private storageSql: SqlLiteData
  ) {
    this.serviceApp.appVersionAll();
  }

  ca() {
    this.serviceVideo.captureVideo();
  }

  storageSqlClear() {
    this.storageSql.recreate();
  }

  sessionStorageClear() {
    this.userData.clearProfile();
  }

  pro() {
    this.notificationService.notificationMaker("test", true, true);
  }

  VideoUri() {
    this.serviceVideo.getVideoUri();
  }
}
