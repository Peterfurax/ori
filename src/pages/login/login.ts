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
  private password: string = undefined;
  private logoState: any = "in";
  private cloudState: any = "in";
  private loginState: any = "in";
  private formState: any = "in";
  private submitted = false;
  private login: { username?: string; password?: string } = {};

  constructor(private navCtrl: NavController, private userData: UserData) {}

  /**
   *  onLogin(form)
   * @param {[type]} form [description]
   * @desc
   */
  onLogin(form) {
    this.submitted = true;
    if (form.valid && form.value.password === this.password ? true : false) {
      this.userData.login();
      this.userData
        .getProfile()
        .then(result => {
          if (!result) this.navCtrl.push(ProfilePage);
          this.navCtrl.setRoot(VideoListPage);
        })
        .catch(err => console.error(err));
    }
  }
}
