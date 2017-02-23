import { Component } from "@angular/core"
import { NavController } from "ionic-angular"
import { UserData } from "../../providers/user-data"
import { ProfileMeta } from "../ProfileMeta/ProfileMeta"

@Component({
  selector: "page-profile",
  templateUrl: "ProfilePage.html"
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
          this.navController.push(ProfileMeta, { profile: this.profile })
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
    this.navController.push(ProfileMeta, { profile: this.profile })
  }

}
