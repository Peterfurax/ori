import { Component } from "@angular/core"
import { NavController, NavParams } from "ionic-angular"
import { SqlLiteData } from "../../providers/sqlLite"

@Component({
  templateUrl: "VideoMeta.html",
})
export class VideoMeta {
  person

  constructor(
    public params: NavParams,
    public storageSql: SqlLiteData,
    private navController: NavController) {
    this.person = params.data.person
  }

  /**
   * [logForm description]
   * @method logForm
   * @return {[type]} [description]
   */
  logForm() {
    this.storageSql.update(this.person)
    this.navController.pop()
  }
}
