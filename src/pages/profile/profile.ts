import { Component } from "@angular/core"
import { NavController, NavParams } from "ionic-angular"
import { UserData } from "../../providers/user-data"
import { VideoService } from "../../app/app.service"
@Component({
  templateUrl: "profile-details.html"
})
export class ProfileDetailsPage {
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

@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  profile: {
    name?: string,
    firstname?: string,
    occupation?: string,
    service?: string,
    society?: string
  } = {
    "name": "",
    "firstname": "",
    "occupation": "",
    "service": "",
    "society": ""
  }
  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    private navController: NavController
  ) {
    this.userData.getProfile().then(
      ProfileResult => {
        console.log(ProfileResult)
        if (ProfileResult === null) {
          this.navController.push(ProfileDetailsPage, { profile: this.profile })
        } else { this.profile = ProfileResult }
      },
      err => console.error(err)
    )
  }

  /**
   * [ionViewDidLoad description]
   */
  ionViewDidLoad() {
    console.log("Hello ProfilePage Page")
  }

  /**
   * [editProfile description]
   */
  editProfile() {
    this.navController.push(ProfileDetailsPage, { profile: this.profile })
  }

}
