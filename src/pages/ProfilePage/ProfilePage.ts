import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { UserData } from "../../providers/user-data";
import { ProfileMeta } from "../ProfileMeta/ProfileMeta";
import { LogService } from "./app.log";
import { Profile } from "../../app/app.interface";
@Component({
  selector: "page-profile",
  templateUrl: "ProfilePage.html"
})
export class ProfilePage {
  profile: Profile = {
    name: "",
    firstname: "",
    occupation: "",
    service: "",
    society: ""
  };

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    private navController: NavController
  ) {
    this.userData
      .getProfile()
      .then((ProfileResult: Profile) => {
        !ProfileResult
          ? this.navController.push(ProfileMeta, { profile: this.profile })
          : (this.profile = ProfileResult);
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * [ionViewDidLoad description]
   */
  ionViewDidLoad() {
    console.log("Hello ProfilePage Page");
  }

  /**
   * [editProfile description]
   */
  editProfile(): void {
    this.navController.push(ProfileMeta, { profile: this.profile });
  }
}
