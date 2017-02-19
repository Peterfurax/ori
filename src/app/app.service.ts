declare const cordova
import * as moment from "moment"
import "moment/src/locale/fr"
import { Injectable } from "@angular/core"
import {
  SpinnerDialog,
  BackgroundMode,
  Vibration,
  Transfer,
  LocalNotifications,
  Toast,
  AppVersion,
  MediaCapture,
  Camera,
  VideoEditor,
  SQLite,
  File
  // VideoPlayer
} from "ionic-native"

@Injectable()

/**
 *  class AppService
 */
export class AppService {
  constructor() { }

  private appName: Promise<string>;
  private appPackageName: Promise<string>;
  private appVersionNumber: Promise<string>;
  private appAllInfo: {
    Names: string,
    PackageName: string,
    VersionNumber: string
  } = {
    Names: "",
    PackageName: "",
    VersionNumber: ""
  };
  /**
   * @name appVersionAll
   * @desc Retrieve app info from AppVersion ionic-native
   * @type PromiseAll
   * @return type:Array [TubeR, com.lesechos.tuber, "0.0.1"] == [AppName, PackageName, VersionNumber]
   */
  appVersionAll() {
    this.appName = AppVersion.getAppName()
    this.appPackageName = AppVersion.getPackageName()
    this.appVersionNumber = AppVersion.getVersionNumber()
    Promise.all([this.appName, this.appPackageName, this.appVersionNumber]).then(
      data => {
        this.appAllInfo.Names = data[0]
        this.appAllInfo.PackageName = data[1]
        this.appAllInfo.VersionNumber = data[2]
      },
      err => { })
  }

  /**
   * [notificationMaker description]
   * @method notificationMaker
   * @return {[type]}          [description]
   */
  notificationMaker() {
    this.notification()
    this.vibrate([500, 500, 500])
  }

  /**
   * [vibrate description]
   * @method vibrate
   * @param  {any}    param [description]
   * @return {[type]}       [description]
   */
  vibrate(param: any) {
    Vibration.vibrate(param)
  }

  /**
   * [notification description]
   * @method notification
   * @return {[type]}     [description]
   */
  notification() {
    LocalNotifications.schedule({
      title: "Application Video",
      text: "message",
      sound: "file://assets/sound/notification_ok.mp3"
    })
  }

}

/**
 *  class VideoService
 */
export class VideoService {
  constructor() {
    moment.locale("fr");
  }
  public database: SQLite;
  public people: Array<Object>;
  public videoArr: any;
  public videoAllInfo: {
    dateImport?: number,
    datePrise?: string,
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
   * [notificationMaker description]
   * @method notificationMaker
   * @param  {[type]}          message [description]
   * @return {[type]}                  [description]
   */
  notificationMaker(message) {
    this.notification(message)
    this.vibrate([500, 200, 500])
  }

  /**
   * [notification description]
   * @method notification
   * @param  {any}        message [description]
   * @return {[type]}             [description]
   */
  notification(message: any) {
    LocalNotifications.schedule({
      title: "Application Video",
      text: message,
      sound: "file://assets/sound/notification_ok.mp3"
    })
  }

  /**
   * [vibrate description]
   * @desc
   * @param {any} param [description]
   */
  vibrate(param: any) {
    Vibration.vibrate(param)
  }

  /**
   * [toast description]
   * @desc
   * @param {any} message [description]
   */
  toast(message: any) {
    Toast.show(message, "5000", "center").subscribe(
      toast => console.log(toast)
    )
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
    // VideoPlayer.play(uri).then(
    //   () => console.log("video completed"),
    //   err => console.log(err)
    // )
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
   * [uriToDate description]
   * @desc
   * @param {string} uriParse [description]
   * @return {Promise}     [description]
   */
  uriToDate(uriParse: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let date = moment(uriParse, "YYYYMMDD_HHmmss").toISOString()
      if (!moment(date).isValid()) { reject("error parsing uriToDate") }
      resolve(date)
    })
  }

  /**
   * [parseUriDate description]
   * @desc
   * @param {string} dateExtract [description]
   * @return {Promise}     [description]
   */
  parseUriDate(dateExtract: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.uriToDate(dateExtract).then(
        data => resolve(data),
        err => reject(err)
      )
    })
  }

  /**
   * [uriExtractFile description]
   * @method uriExtractFile
   * @param  {string}   uri [description]
   * @return {[type]}       [description]
   */
  uriExtractFile(uri: string) {
    return (/[^/]*$/g).exec(uri)[0]
  }

  /**
   * [uriExtractFileWithoutExt description]
   * @method uriExtractFileWithoutExt
   * @param  {Object}                 arr [description]
   * @return {[type]}                     [description]
   */
  uriExtractFileWithoutExt(uriExtractFile: string) {
    return (/[^.]*/g).exec(uriExtractFile)[0]
  }

  /**
   * [parseUri description]
   * @method parseUri
   * @param  {string} uri [description]
   * @return {[type]}     [description]
   */
  parseUri(uri: string) {
    return this.uriExtractFileWithoutExt(this.uriExtractFile(uri))
  }

  /**
   * [convertUriToDate description]
   * @method convertUriToDate
   * @param  {string}         uri [description]
   * @return {Promise<any>}       [description]
   */
  convertUriToDate(uri: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.parseUriDate(this.parseUri(uri)).then(
        data => resolve(data),
        err => reject(err)
      )
    })
  }

  /**
   * [stockCaptureVideo description]
   * @method stockCaptureVideo
   * @param  {[type]}          uri [file:/storage/emulated/0/DCIM/Camera/VID_20161119_075425.mp4]
   * @return {Promise<any>}        [description]
   */
  stockCaptureVideo(uri): Promise<any> {
    return new Promise((resolve, reject) => {
      Promise.all([this.getVideoMeta(uri), this.getVideoThumb(uri), this.convertUriToDate(uri)]).then(
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
  getVideoMeta(uri): Promise<any> {
    return new Promise((resolve, reject) => {
      uri = "file:/" + uri; // NOT COOL MUST FIX URI :/
      VideoEditor.getVideoInfo({ fileUri: uri }).then(
        data => {
          if (data.orientation === "portrait") {
            this.toast("Attention : Format portrait détecté")
            // reject("portrait")
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
        width: 320, // optional, width of the thumbnail
        height: 480, // optional, height of the thumbnail
        quality: 100 // optional, quality of the thumbnail (between 1 and 100)
      })
        .then(
        data => resolve(data),
        err => reject(err)
        )
    })
  }


  finishTxt(item) {
    this.WriteTxtMeta(item).then(
      result => {
        this.uploadFile(item.uri, "txt").then(
          () => { this.uploadEndService() },
          err => { this.uploadEndService(err) })
      },
      err => { this.uploadEndService(err) })
  }

  /**
   * [progress description]
   * @type {any}
   */
  progress: any
  upload(item) {
    this.uploadInitService()
    return new Promise((resolve, reject) => {
      this.WriteJsonMeta(item).then((result) => {
        console.log("retour uri json", result)
        Promise.all([this.uploadFile(result, "json"), this.uploadFile(item.uri, "mp4")]).then(
          data => this.uploadFile(item.uri, "txt").then(
            () => { this.uploadEndService(data) },
            err => { this.uploadEndService(err) }),
          err => this.uploadEndService(err))
      }, err => { this.uploadEndService(err) })
        .then(
        () => resolve(),
        err => this.uploadEndService(err)
        )
    })
  }
  // TODO 11
  /**
   * [uploadInitService description]
   * @method uploadInitService
   * @return {[type]}          [description]
   */
  uploadInitService() {
    SpinnerDialog.show()
    BackgroundMode.enable()
  }
  /* FIXME */
  /**
   * [uploadEndService description]
   * @method uploadEndService
   * @param  {string}         message [description]
   * @return {[type]}                 [description]
   */
  uploadEndService(message?: any) {
    message = JSON.stringify(message)
    console.dir(message)
    SpinnerDialog.hide()
    this.notificationMaker(message)
    this.toast(message)
    BackgroundMode.disable()
  }

  uploadFile(uri: string, type: string): Promise<any> {
    console.log(uri)
    const fileTransfer = new Transfer()
    let perc = 0
    return new Promise((resolve, reject) => {
      let optionFileTransfer
      if (type === "mp4") {
        console.log("mp4")
        optionFileTransfer = {
          mimeType: "video/mp4",
          timeout: 3000,
          fileName: Date.now() + ".mp4"
        }
      }
      if (type === "json") {
        console.log("json")
        optionFileTransfer = {
          mimeType: "application/json",
          timeout: 3000,
          fileName: Date.now() + ".json"
        }
      }
      if (type === "txt") {
        console.log("txt")
        optionFileTransfer = {
          mimeType: "text/plain",
          timeout: 3000,
          fileName: Date.now() + ".txt"
        }
      }

      fileTransfer.onProgress(
        progressEvent => {
          if (progressEvent.lengthComputable) {
            perc = Math.floor(progressEvent.loaded / progressEvent.total * 100)
            this.progress = perc
            console.log(this.progress)
          }
        }
      )
      fileTransfer.upload(uri, "http://192.168.0.12:8000", optionFileTransfer).then(
        data => resolve(data),
        err => reject(err)
      )
    })
  }

  /**
   * [deleteDataJson description]
   * @method deleteDataJson
   * @return {[type]}       [description]
   */
  // deleteDataJson() {
  //   File.removeFile(cordova.file.dataDirectory, this.fileName).then(
  //     result => { console.log("delete OK ", result) },
  //     err => { console.log("delete ERR", err) })
  // }

  /**
   * [createJsonDir description]
   * @method createJsonDir
   * @return {[type]}      [description]
   */
  // createJsonDir() {
  //   File.createDir(cordova.file.dataDirectory, "json/", true).then(
  //     result => { console.log("createJsonDir OK", result) },
  //     err => { console.log("createJsonDir", err) })
  // }

  // read() {
  //   File.readAsText(cordova.file.dataDirectory, this.fileName).then(result => { console.log("readAsText OK ", result) }, err => { console.log("readAsText ERR", err) })
  // }
  //
  /**
   * [checkFileJsonMeta description]
   * @method checkFileJsonMeta
   * @param  {string}          uriExtractFile [description]
   * @return {[type]}                         [description]
   */
  checkFileJsonMeta(uriExtractFile: string) {
    return new Promise((resolve, reject) => {
      File.checkFile(cordova.file.dataDirectory, uriExtractFile).then(
        result => {
          File.removeFile(cordova.file.dataDirectory, uriExtractFile).then(
            result => { resolve(result) },
            err => { reject(err) })
        },
        err => {
          resolve()
        })
    })
  }

  checkFileTxtMeta(uriExtractFile: string) {
    return new Promise((resolve, reject) => {
      File.checkFile(cordova.file.dataDirectory, uriExtractFile).then(
        result => {
          File.removeFile(cordova.file.dataDirectory, uriExtractFile).then(
            result => { resolve(result) },
            err => { reject(err) })
        },
        err => {
          resolve()
        })
    })
  }

  // File.listDir(cordova.file.dataDirectory, "").then(
  //   result => { console.log("listDir OK", result) },
  //   err => {
  //     console.log("listDir", err)
  //   })

  /**
   * [WriteJsonMeta description]
   * @method WriteJsonMeta
   * @param  {any}          item [description]
   * @return {Promise<any>}      [description]
   */
  WriteJsonMeta(item: any): Promise<any> {
    // let uriExtractFile = this.uriExtractFile(item.uri)
    let uriExtractFileWithoutExt = this.parseUri(item.uri)
    return new Promise((resolve, reject) => {
      this.checkFileJsonMeta(uriExtractFileWithoutExt + ".json").then(
        value => {
          File.writeFile(cordova.file.dataDirectory, uriExtractFileWithoutExt + ".json", JSON.stringify(item), true).then(
            () => { resolve(cordova.file.dataDirectory + uriExtractFileWithoutExt + ".json") },
            err => { reject(err) })
        },
        err => {
          reject(err)
        })
    })
  }
  WriteTxtMeta(item: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let uriExtractFileWithoutExt = this.parseUri(item.uri)
      this.checkFileTxtMeta(uriExtractFileWithoutExt + ".txt").then(
        value => {
          File.createFile(cordova.file.dataDirectory, uriExtractFileWithoutExt + ".txt", true).then(
            () => { resolve(cordova.file.dataDirectory + uriExtractFileWithoutExt + ".txt") },
            err => { reject(err) })
        },
        err => {
          reject(err)
        })
    })
  }

  /**
   * [BgEnable description]
   * @method BgEnable
   * @return {[type]} [description]
   */
  BgEnable() {
    BackgroundMode.enable()
  }

}
