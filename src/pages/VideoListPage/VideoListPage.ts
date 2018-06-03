import { Component } from "@angular/core";
import { VideoService } from "../../app/video.service";
import { TransfertService } from "../../app/tranfert.service";
import { NavController } from "ionic-angular";
import { SqlLiteData } from "../../providers/sqlLite";
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
    private serviceVideo: VideoService,
    private transfertService: TransfertService,
    private log: LogService,
    private storageSql: SqlLiteData
  ) {
    this.log.console(this);
  }

  isvalideToExport(item) {
    this.log.console(item);
  }

  /**
   * delete item in SqlLiteData with this.item.uri
   * @method delete
   * @param  {string} uri:string uri item
   */
  delete(uri: string): void {
    this.storageSql
      .delete(uri)
      .then(result => this.log.console(result))
      .catch(err => this.log.console(err, true));
  }

  /**
   * Open DetailsPage on import video => refresh db, take last, get, insert to form
   * @method openDetailOnImport
   */
  openDetailOnImport(): void {
    this.storageSql
      .refresh()
      .then(() =>
        this.openNavDetailsPage(
          this.storageSql.people[this.storageSql.people.length - 1]
        )
      )
      .catch(err => this.log.console(err, true));
  }

  /**
   * playVideo description
   * @method playVideo
   * @param  {[type]}  uri
   * @return {[type]}
   */
  playVideo(uri: string): void {
    this.serviceVideo.playVideo(uri);
  }

  testDoublon(item): object {
    return this.storageSql.people.find((element: { uri: string }) => {
      return element.uri === item.uri;
    });
  }

  // showUploadBar = false
  /**
   * upload description
   * @method upload
   * @param  {[type]} item
   */
  upload(item): void {
    this.transfertService
      .upload(item)
      .then(result => this.log.console(result))
      .catch(err => this.log.console(err, true));
  }

  /**
   * add description
   * @method add
   */
  add(): void {
    this.serviceVideo
      .getVideoUri()
      .then(async (uri: string) => {
        this.serviceVideo
          .stockCaptureVideo(uri)
          .then(async (result: object) => {
            this.testDoublon(result) === undefined
              ? this.storageSql
                  .Insert(result)
                  .then(() => this.openDetailOnImport())
                  .catch(err =>
                    this.log.console("storageSql.Insert : " + err, true)
                  )
              : this.log.console("after stockCaptureVideo : Doublon ", true);
          })
          .catch(err =>
            this.log.console("serviceVideo.stockCaptureVideo : " + err, true)
          );
      })
      .catch(err =>
        this.log.console("serviceVideo.getVideoUri : " + err, true)
      );
  }

  /**
   * openNavDetailsPage description
   * @method openNavDetailsPage
   * @param  {[type]}           video
   * @return {[type]}
   */
  openNavDetailsPage(video): void {
    this.navController.push(VideoMeta, { video: video });
  }

  /**
   * clicked description
   * @method clicked
   * @return {[type]}
   */
  clicked(): void {
    this.show = !this.show;
  }

  /**
   * showSearch description
   * @method showSearch
   * @return {[type]}
   */
  showSearchB(): void {
    this.showSearch = !this.showSearch;
  }
}
