import { ProfilePage } from "../ProfilePage/ProfilePage";
import { UserData } from "../../providers/user-data";
// import { Component, trigger, state, style, transition, animate, keyframes } from "@angular/core"
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { VideoListPage } from "../VideoListPage/VideoListPage";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  submitted = false;
  login: { username?: string; password?: string } = {};
  // profile: {
  //   name?: string;
  //   firstname?: string;
  //   occupation?: string;
  //   service?: string;
  //   compagnie?: string;
  // } = {
  //   name: "",
  //   firstname: "",
  //   occupation: "",
  //   service: "",
  //   compagnie: ""
  // };

  constructor(public navCtrl: NavController, public userData: UserData) {}

  /**
   *  onLogin(form)
   * @param {[type]} form [description]
   * @desc
   */
  onLogin(form) {
    this.submitted = true;
    if (form.valid) {
      this.userData.login(this.login.username);
      this.userData
        .getProfile()
        .then(result => {
          if (result === null) {
            this.navCtrl.push(ProfilePage);
            this.navCtrl.setRoot(VideoListPage);
          } else this.navCtrl.setRoot(VideoListPage);
        })
        .catch(err => console.error(err));
    }
  }
}
