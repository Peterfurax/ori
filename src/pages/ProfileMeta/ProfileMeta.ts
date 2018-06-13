import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { UserData } from "../../providers/user-data";
import { VideoService } from "../../app/video.service";
import { Profile } from "../../app/app.interface";
@Component({
  templateUrl: "ProfileMeta.html",
  selector: "page-ProfileMeta"
})
export class ProfileMeta {
  profile: Profile;

  constructor(
    private params: NavParams,
    private navController: NavController,
    private userData: UserData,
    private serviceVideo: VideoService
  ) {
    this.profile = params.data.profile;
  }

  test() {
    this.serviceVideo.captureImage();
  }

  /**
   * [logForm description]
   */
  logForm(): void {
    Promise.all([
      this.userData.setProfile(this.profile),
      this.navController.pop()
    ])
      .then(value => {
        console.log(value);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
