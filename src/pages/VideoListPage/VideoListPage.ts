import { Component } from "@angular/core";
import { AppService } from "../../app/app.service";
import { VideoService } from "../../app/video.service";
import { TransfertService } from "../../app/tranfert.service";
import { NavController, Platform } from "ionic-angular";
import { SqlLiteData } from "../../providers/sqlLite";
import { UserData } from "../../providers/user-data";
import { LogService } from "../../app/app.log";
import { VideoMeta } from "../VideoMeta/VideoMeta";
/**
 *
 * AFFICHE LISTE DES VIDEOS
 * @export
 * @class VideoListPage
 */
@Component({
  selector: "page-VideoListPage",
  templateUrl: "VideoListPage.html"
})
export class VideoListPage {
  people: Array<Object>;
  show: boolean = false;
  showSearch: boolean = false;
  constructor(
    private navController: NavController,
    private platform: Platform,
    private serviceVideo: VideoService,
    private serviceApp: AppService,
    private transfertService: TransfertService,
    private logApp: LogService,
    private storage: UserData,
    private storageSql: SqlLiteData
  ) {
    console.log(this);
  }

  isvalideToExport(item) {
    console.log(item);
  }

  /**
   * delete item in SqlLiteData with this.item.uri
   * @method delete
   * @param  {string} uri:string uri item
   */
  delete(uri: string) {
    this.storageSql
      .delete(uri)
      .then(result => this.logApp.log(result))
      .catch(err => this.logApp.log(err));
  }

  /**
   * Open DetailsPage on import video => refresh db, take last, get, insert to form
   * @method openDetailOnImport
   */
  openDetailOnImport():void {
    this.storageSql
      .refresh()
      .then(() =>
        this.openNavDetailsPage(
          this.storageSql.people[this.storageSql.people.length - 1]
        )
      )
      .catch(err => this.logApp.log(err));
  }

  /**
   * playVideo description
   * @method playVideo
   * @param  {[type]}  uri
   * @return {[type]}
   */
  playVideo(uri:string):void {
    this.serviceVideo.playVideo(uri);
  }

  // showUploadBar = false
  /**
   * upload description
   * @method upload
   * @param  {[type]} item
   */
  upload(item) {
    this.transfertService
      .upload(item)
      .then(result => this.logApp.log(result))
      .catch(err => this.logApp.log(err));
  }

  /**
   * add description
   * @method add
   */
  add():void {
    this.serviceVideo
      .getVideoUri()
      .then( async uri => {
        this.serviceVideo
          .stockCaptureVideo(uri)
          .then(async result =>
            this.storageSql
              .Insert(result)
              .then(result => this.openDetailOnImport())
              .catch(err => console.error("ERROR storageSql.Insert : ", err))
          )
          .catch(err =>
            console.error("ERROR serviceVideo.stockCaptureVideo : ", err)
          );
      })
      .catch(err => console.error("ERROR serviceVideo.getVideoUri : ", err));
  }

  /**
   * openNavDetailsPage description
   * @method openNavDetailsPage
   * @param  {[type]}           person
   * @return {[type]}
   */
  openNavDetailsPage(person):void {
    this.navController.push(VideoMeta, { person: person });
  }

  /**
   * clicked description
   * @method clicked
   * @return {[type]}
   */
  clicked():void {
    this.show = !this.show;
  }

    /**
   * showSearch description
   * @method showSearch
   * @return {[type]}
   */
  showSearchB():void {
    this.showSearch = !this.showSearch;
  }
}
