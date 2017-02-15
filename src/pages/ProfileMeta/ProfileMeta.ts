import { Component } from "@angular/core"
import { NavController, NavParams } from "ionic-angular"
import { UserData } from "../../providers/user-data"
import { VideoService } from "../../app/app.service"
@Component({
  templateUrl: "ProfileMeta.html",
  selector: "page-ProfileMeta",
})
export class ProfileMeta {
  profile

  constructor(
    private params: NavParams,
    private navController: NavController,
    public userData: UserData,
    public serviceVideo: VideoService
  ) {
    this.profile = params.data.profile
  }

  test() {
    this.serviceVideo.captureImage()
  }

  /**
   * [logForm description]
   */
  logForm() {
    this.userData.setProfile(this.profile)
    this.navController.pop()
  }
}
