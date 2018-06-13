import { ProfilePage } from "../ProfilePage/ProfilePage";
import { UserData } from "../../providers/user-data";
// import { Component, trigger, state, style, transition, animate, keyframes } from "@angular/core"
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { VideoListPage } from "../VideoListPage/VideoListPage";
import { Profile } from "../../app/app.interface";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  private password: string = undefined;
  private submitted: boolean = false;
  private haveAProfile: boolean = true;
  private login: {
    // username?: string;
    password?: string;
  } = {};

  constructor(private navCtrl: NavController, private userData: UserData) {}

  async testProfile(): Promise<any> {
    return this.userData
      .getProfile()
      .then((result: Profile) => {
        if (!result) {
          this.navCtrl.push(ProfilePage);
          this.haveAProfile = false;
        }
        this.navCtrl.setRoot(VideoListPage);
        return { haveAProfile: this.haveAProfile };
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  goodLogin(): void {
    Promise.all([this.userData.login(), this.testProfile()])
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  }

  badLogin(): void {
    console.error("badloging");
  }

  /**
   *  onLogin(form)
   * @param {[type]} form [description]
   * @desc
   */
  onLogin(form) {
    this.submitted = true;
    (form.valid && form.value.password === this.password
    ? true
    : false)
      ? this.goodLogin()
      : this.badLogin();
  }
}
