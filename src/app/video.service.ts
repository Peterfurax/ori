declare const cordova
import { Injectable } from "@angular/core"
import { ParseService } from "./parse.service"
import { NotificationService } from "./notification.service"
import {
  MediaCapture,
  Camera,
  VideoEditor
} from "ionic-native"

@Injectable()

/**
 *  class VideoService
 */
export class VideoService {
  constructor(
    public parseService: ParseService,
    public notificationService: NotificationService
  ) { }

  public videoAllInfo: {
    dateImport?: number,
    datePrise?: string,
    dateSend?: string,
    resultSend: string,
    uri?: string,
    uriThumb?: string,
    infoVideo?: {
      bitrate?: number,
      duration?: number,
      height?: number,
      orientation?: string,
      size?: number,
      width?: number
    }
  } = {
    dateImport: 0,
    datePrise: "",
    dateSend: "",
    resultSend: "",
    uri: "",
    uriThumb: "",
    infoVideo: {
      bitrate: 0,
      duration: 0,
      height: 0,
      orientation: "",
      size: 0,
      width: 0
    }
  }

  /**
   * [playVideo description]
   * @desc
   * @param {[type]} uri [description]
   */
  playVideo(uri) {
    console.log(uri)
    // FIXME seem dont work
    // NOT COOL MUST FIX URI :/
    // uri = "file:/" + uri
    // console.log(this.videoPlayer)
    // // this.videoPlayer.play(uri).then(
    // //   () => console.log("video completed"),
    // //   err => console.log(err)
    // // )
  }

  /**
   * [CAPTURE VIDEO FROM CAMERA DEVICE]
   * @name captureVideo()
   * @function Load native camera device { MediaCapture } from "ionic-native"
   * @type Promise
   * @param null
   * @return :
   * [
   *   fullPath: "file:/storage/emulated/0/DCIM/Camera/VID_20161119_075425.mp4",
   *   lastModified: null,
   *   lastModifiedDate:1479538465000,
   *   localURL: "cdvfile://localhost/sdcard/DCIM/Camera/VID_20161119_075425.mp4",
   *   name: "VID_20161119_075425.mp4",
   *   size:561702,
   *   start:0,
   *   type: "video/mp4"
   * ]
   */
  captureVideo() {
    MediaCapture.captureVideo().then(
      data => this.stockCaptureVideo(data),
      err => console.error(err)
    )
  }

  /**
   * [captureImage description]
   * @method captureImage
   * @return {[type]}     [description]
   */
  captureImage() {
    MediaCapture.captureImage().then(
      data => console.log(data),
      err => console.error(err)
    )
  }

  /**
   * [stockCaptureVideo description]
   * @method stockCaptureVideo
   * @param  {[type]}          uri [file:/storage/emulated/0/DCIM/Camera/VID_20161119_075425.mp4]
   * @return {Promise<any>}        [description]
   */
  stockCaptureVideo(uri): Promise<any> {
    return new Promise((resolve, reject) => {
      Promise.all([this.getVideoMeta(uri), this.getVideoThumb(uri), this.parseService.convertUriToDate(uri)]).then(
        data => {
          this.videoAllInfo.infoVideo = data[0]
          this.videoAllInfo.uriThumb = data[1]
          this.videoAllInfo.datePrise = data[2]
          this.videoAllInfo.dateImport = Date.now()
          this.videoAllInfo.uri = uri
          resolve(this.videoAllInfo)
        },
        err => reject(err)
      )
    })
  }

  /**
   * [getVideoUri description]
   * @method getVideoUri
   * @return {Promise<any>} [description]
   */
  getVideoUri(): Promise<any> {
    return new Promise((resolve, reject) => {
      Camera.getPicture({
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        mediaType: 1
      }).then(
        data => resolve(data),
        err => reject(err)
        )
    })
  }

  /**
   * [getVideoMeta description]
   * @desc
   * @param  {string}  uri [storage/emulated/0/DCIM/Camera/VID_20161119_075425.mp4]
   * @return {Promise}     [description]
   */
  getVideoMeta(uri: string): Promise<any> {
    return new Promise((resolve, reject) => {
      uri = "file:/" + uri; // NOT COOL MUST FIX URI :/
      VideoEditor.getVideoInfo({ fileUri: uri }).then(
        data => {
          if (data.orientation === "portrait") {
            this.notificationService.toastIt("Attention : Format portrait détecté")
            reject("portrait")
          }
          resolve(data)
        },
        err => reject(err)
      )
    })
  }

  /**
   * [getVideoThumb description]
   * @desc
   * @param  {string}  uri [storage/emulated/0/DCIM/Camera/VID_20161119_075425.mp4]
   * @return {Promise}     [/storage/emulated/0/Android/data/com.ionicframework.tuber560001/files/files/videos/output-name.jpg]
   */
  date: any;
  getVideoThumb(uri: string): Promise<any> {
    this.date = Date.now()
    return new Promise((resolve, reject) => {
      uri = "file:/" + uri // NOT COOL MUST FIX URI :/
      VideoEditor.createThumbnail({
        fileUri: uri, // the path to the video on the device
        outputFileName: this.date, // the file name for the JPEG image
        atTime: 10, // optional, location in the video to create the thumbnail (in seconds)
        width: 191, // optional, width of the thumbnail
        height: 340, // optional, height of the thumbnail
        quality: 75 // optional, quality of the thumbnail (between 1 and 100)
      })
        .then(
        data => resolve(data),
        err => reject(err)
        )
    })
  }


















}
