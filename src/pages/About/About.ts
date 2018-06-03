import { Component } from "@angular/core";
import { AppService } from "../../app/app.service";
import { VideoService } from "../../app/video.service";
import { UserData } from "../../providers/user-data";
import { SqlLiteData } from "../../providers/sqlLite";
import { NotificationService } from "../../app/notification.service";
import { Alert } from "../../app/alerter.service";
@Component({
  selector: "page-About",
  templateUrl: "About.html"
})
export class About {
  constructor(
    private alert: Alert,
    private notificationService: NotificationService,
    private serviceVideo: VideoService,
    private serviceApp: AppService,
    private userData: UserData,
    private storageSql: SqlLiteData
  ) {
    this.serviceApp.appVersionAll();
  }

  ca(): void {
    this.serviceVideo.captureVideo();
  }

  storageSqlClear(): void {
    this.storageSql.recreate();
  }

  sessionStorageClear(): void {
    this.userData.clearProfile();
  }

  pro(): void {
    this.notificationService.notificationMaker("test", true, true, true);
  }

  VideoUri(): void {
    this.serviceVideo.getVideoUri();
  }

  alertTest(): void {
    this.alert.presentConfirm();
  }
}
