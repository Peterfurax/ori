import { ProfilePage } from "../profile/profile"
import { UserData } from "../../providers/user-data"
import { Component, trigger, state, style, transition, animate, keyframes } from "@angular/core"
import { NavController } from "ionic-angular"
import { VideoListPage } from "../VideoListPage/VideoListPage"

@Component({
  selector: "page-login",
  templateUrl: "login.html",

  animations: [

    // For the logo
    trigger("flyInBottomSlow", [
      state("in", style({
        transform: "translate3d(0,0,0)"
      })),
      transition("void => *", [
        style({ transform: "translate3d(0,2000px,0" }),
        animate("1000ms ease-in-out")
      ])
    ]),

    // For the background detail
    trigger("flyInBottomFast", [
      state("in", style({
        transform: "translate3d(0,0,0)"
      })),
      transition("void => *", [
        style({ transform: "translate3d(0,2000px,0)" }),
        animate("500ms ease-in-out")
      ])
    ]),

    // For the login form
    trigger("bounceInBottom", [
      state("in", style({
        transform: "translate3d(0,0,0)"
      })),
      transition("void => *", [
        animate("1000ms 100ms ease-in", keyframes([
          style({ transform: "translate3d(0,2000px,0)", offset: 0 }),
          style({ transform: "translate3d(0,-20px,0)", offset: 0.9 }),
          style({ transform: "translate3d(0,0,0)", offset: 1 })
        ]))
      ])
    ]),

    // For login button
    trigger("fadeIn", [
      state("in", style({
        opacity: 1
      })),
      transition("void => *", [
        style({ opacity: 0 }),
        animate("500ms 1000ms ease-in")
      ])
    ])
  ]
})
export class LoginPage {
  logoState: any = "in"
  cloudState: any = "in"
  loginState: any = "in"
  formState: any = "in"
  submitted = false;
  login: { username?: string, password?: string } = {};
  profile: {
    name?: string,
    firstname?: string,
    occupation?: string,
    service?: string,
    compagnie?: string
  } = {
    "name": "",
    "firstname": "",
    "occupation": "",
    "service": "",
    "compagnie": ""
  };

  constructor(
    public navCtrl: NavController,
    public userData: UserData
  ) { }

  /**
   *  onLogin(form)
   * @param {[type]} form [description]
   * @desc
   */
  onLogin(form) {
    this.submitted = true
    if (form.valid) {
      this.userData.login(this.login.username)
      this.userData.getProfile().then(
        result => {
          if (result === null) {
            this.navCtrl.pop()
            this.navCtrl.push(ProfilePage)
            this.navCtrl.setRoot(VideoListPage)
          }
          this.navCtrl.pop()
          this.navCtrl.setRoot(VideoListPage)
        },
        err => {
          console.error(err)
        })
    }
  }
}
