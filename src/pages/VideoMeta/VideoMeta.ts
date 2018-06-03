import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { SqlLiteData } from "../../providers/sqlLite";

@Component({
  templateUrl: "VideoMeta.html"
})
export class VideoMeta {
  video:object;

  constructor(
    public params: NavParams,
    public storageSql: SqlLiteData,
    private navController: NavController
  ) {
    this.video = params.data.video;
  }

  /**
   * [logForm description]
   * @method logForm
   * @return {[type]} [description]
   */
  logForm(): void {
    this.storageSql.update(this.video);
    this.navController.pop();
  }
}
