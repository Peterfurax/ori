import { Component, ViewChild } from "@angular/core"
import { Events, MenuController, Nav, Platform } from "ionic-angular"
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite } from "ionic-native"
import { About } from "../pages/About/About"
import { VideoListPage } from "../pages/VideoListPage/VideoListPage"
import { LoginPage } from "../pages/login/login"
import { UserData } from "../providers/user-data"
import { ProfilePage } from "../pages/ProfilePage/ProfilePage"

export interface PageObj {
  title?: string;
  component?: any;
  icon?: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav

  /**
   * [rootPage define rootPage on init]
   * @type {any}
   */
  rootPage: any = LoginPage

  /**
   * [appPages links in menu  alway see]
   * @type {PageObj[]}
   */
  appPages: PageObj[] = [
    { title: "A Propos", component: About, icon: "information-circle" },
  ]

  /**
   * [loggedInPages links in menu when logIn ]
   * @type {PageObj[]}
   */
  loggedInPages: PageObj[] = [
    { title: "Videos", component: VideoListPage, icon: "videocam" },
    { title: "Compte", component: ProfilePage, icon: "contact" },
    { title: "Déconnecter", component: LoginPage, icon: "log-out", logsOut: true }
  ]

  /**
   * [loggedOutPages links in menu when logOut ]
   * @type {PageObj[]}
   */
  loggedOutPages: PageObj[] = [
    { title: "Connecter", component: LoginPage, icon: "log-in" }
  ]

  constructor(

    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private userData: UserData,
    private platform: Platform,
    private events: Events,
    private menu: MenuController) {
    this.initializeApp()
    this.userData.hasLoggedIn().then(
      hasLoggedIn => {
        this.enableMenu(hasLoggedIn === true)
        this.rootPage = LoginPage
      },
      err => console.error(err)
    )
    this.listenToLoginEvents()
  }

  /**
   * [initializeApp description]
   * @method initializeApp
   * @return {[type]}      [description]
   */
  initializeApp() {
    this.platform.ready().then(
      () => {
        // StatusBar.styleDefault()
        // StatusBar.styleBlackTranslucent()
        this.splashScreen.hide()
        this.statusBar.hide()
        let db = new SQLite()
        const sqlRow = [
          "uri TEXT",
          "uriThumb TEXT",
          "bitrate INT",
          "duration TEXT",
          "height TEXT",
          "orientation TEXT",
          "size TEXT",
          "width TEXT",
          "guestname TEXT",
          "guestfirstname TEXT",
          "guestoccupation TEXT",
          "guestplace TEXT",
          "guestS1 TEXT",
          "guesttext TEXT",
          "journalistname TEXT",
          "journalistfirstname TEXT",
          "journalistoccupation TEXT",
          "journalistsociety TEXT",
          "journalistservice TEXT",
          "distributionembargo_date TEXT",
          "distributionsave_rush TEXT",
          "distributionArr TEXT",
          "dateImport INT",
          "datePrise INT",
          "dateExport INT"
        ]
        db.openDatabase({ name: "data.db", location: "default" }).then(
          () => {
            db.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT," + sqlRow.toString() + ")", {}).then(
              data => console.log("TABLE CREATED: ", data),
              err => console.error("Unable to execute sql", err)
            )
          },
          err => console.error("Unable to open database", err))
      },
      err => console.error(err)
    )
  }

  /**
   * [openPage description]
   * @method openPage
   * @param  {PageObj} page [description]
   * @return {[type]}       [description]
   */
  openPage(page: PageObj) {
    this.nav.setRoot(page.component)
    if (page.logsOut === true) {
      setTimeout(() => {
        this.userData.logout()
      }, 1000)
    }

  }

  /**
   * [listenToLoginEvents description]
   * @method listenToLoginEvents
   * @return {[type]}            [description]
   */
  listenToLoginEvents() {
    this.events.subscribe("user:login", () => this.enableMenu(true), err => console.error(err))
    this.events.subscribe("user:signup", () => this.enableMenu(true), err => console.error(err))
    this.events.subscribe("user:logout", () => this.enableMenu(false), err => console.error(err))
  }

  /**
   * [enableMenu description]
   * @method enableMenu
   * @param  {[type]}   loggedIn [description]
   * @return {[type]}            [description]
   */
  enableMenu(loggedIn) {
    console.log(loggedIn)
    this.menu.enable(loggedIn, "loggedInMenu")
    this.menu.enable(!loggedIn, "loggedOutMenu")
  }
}
