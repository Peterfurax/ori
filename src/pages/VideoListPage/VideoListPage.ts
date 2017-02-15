import { Component } from "@angular/core"
import { VideoService, AppService } from "../../app/app.service"
import { NavController, Platform } from "ionic-angular"
import { SqlLiteData } from "../../providers/sqlLite"
import { UserData } from "../../providers/user-data"
import { LogService} from "../../app/app.log"
import { VideoMeta } from "../VideoMeta/VideoMeta"

@Component({
  selector: "page-VideoListPage",
  templateUrl: "VideoListPage.html"
})
export class VideoListPage {
  people: Array<Object>

  constructor(
    private navController: NavController,
    private platform: Platform,
    public serviceVideo: VideoService,
    public serviceApp: AppService,
    public logApp: LogService,
    public storage: UserData,
    public storageSql: SqlLiteData
  ) { }

  /**
   * [delete item in SqlLiteData with this.item.uri]
   * @method delete
   * @param  {[string]} uri [uri item ]
   * @return {[console]}     [promise return from SqlLite.ts.delete()]
   */
  delete(uri) {
    this.storageSql.delete(uri).then(
      result => this.logApp.log(result),
      err => this.logApp.log(err)
    )
  }

  /**
   * [Open DetailsPage on import video => refresh db, take last, get, insert to form]
   * @method openDetailOnImport
   * @return {[type]}           [description]
   */
  openDetailOnImport() {
    this.storageSql.refresh().then(
      () => {
        this.openNavDetailsPage(this.storageSql.people[this.storageSql.people.length - 1])
      }, err => {
        console.error(err)
      })
  }

  /**
   * [playVideo description]
   * @method playVideo
   * @param  {[type]}  uri [description]
   * @return {[type]}      [description]
   */
  playVideo(uri) {
    this.serviceVideo.playVideo(uri)
  }

  showUploadBar = false
  /**
   * [upload description]
   * @method upload
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  upload(item) {
    this.serviceVideo.upload(item)
    this.showUploadBar = !this.showUploadBar
  }

  /**
   * [add description]
   * @method add
   * @return {[type]} [description]
   */
  add() {
    this.people = []
    this.serviceVideo.getVideoUri().then(
      uri => {
        this.serviceVideo.stockCaptureVideo(uri).then(
          result => this.storageSql.Insert(result).then(
            result => this.openDetailOnImport(),
            err => console.error("ERROR storageSql.Insert : ", err)
          ),
          err => console.error("ERROR serviceVideo.stockCaptureVideo : ", err)
        )
      },
      err => console.error("ERROR serviceVideo.getVideoUri : ", err)
    )
  }

  /**
   * [openNavDetailsPage description]
   * @method openNavDetailsPage
   * @param  {[type]}           person [description]
   * @return {[type]}                  [description]
   */
  openNavDetailsPage(person) {
    this.navController.push(VideoMeta, { person: person })
  }


  show = false
  /**
   * [clicked description]
   * @method clicked
   * @return {[type]} [description]
   */
  clicked() {
    this.show = !this.show
  }
}
