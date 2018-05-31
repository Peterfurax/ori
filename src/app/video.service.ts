// declare const cordova;
import { Injectable } from "@angular/core";
import { ParseService } from "./parse.service";
import { NotificationService } from "./notification.service";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { VideoEditor } from "@ionic-native/video-editor";

import { VideoPlay } from "./native/videoPlayer";

import { MediaExtract } from "./native/mediaCapture";
@Injectable()

/**
 *  class VideoService
 */
export class VideoService {
  videoAllInfo: {
    dateImport?: number;
    datePrise?: string;
    dateSend?: string;
    resultSend: string;
    uri?: string;
    uriThumb?: string;
    infoVideo?: {
      bitrate?: number;
      duration?: number;
      height?: number;
      orientation?: string;
      size?: number;
      width?: number;
    };
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
  };
  constructor(
    private mediaExtract: MediaExtract,
    private videoPlay: VideoPlay,
    private parseService: ParseService,
    private notificationService: NotificationService,
    private camera: Camera,
    private videoEditor: VideoEditor
  ) {}

  /**
   * [playVideo description]
   * @desc
   * @param {[type]} uri [description]
   */
  playVideo(uri): void {
    this.videoPlay.play(uri);
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
  captureVideo(): void {
    this.mediaExtract
      .captureVideo()
      .then((data: string) => {
        console.log("je suis captureVideo");
        console.log(data);
        this.stockCaptureVideo(data);
      })
      .catch(err => console.error(err));
  }

  /**
   * [captureImage description]
   * @method captureImage
   * @return {[type]}     [description]
   */
  captureImage(): void {
    this.mediaExtract
      .captureImage()
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  /**
   * [stockCaptureVideo description]
   * @method stockCaptureVideo
   * @param  {[type]}          uri [file:/storage/emulated/0/DCIM/Camera/VID_20161119_075425.mp4]
   * @return {Promise<any>}        [description]
   */
  async stockCaptureVideo(uri:string): Promise<any> {
      return Promise.all([
        this.getVideoMeta(uri),
        this.getVideoThumb(uri),
        this.parseService.convertUriToDate(uri)
      ])
        .then((data: [{bitrate: number, duration: number, height: number, orientation: string, size: number, width: number}, string, string]) => {
          this.videoAllInfo.infoVideo = data[0];
          this.videoAllInfo.uriThumb = data[1];
          this.videoAllInfo.datePrise = data[2];
          this.videoAllInfo.dateImport = Date.now();
          this.videoAllInfo.uri = uri;
          return this.videoAllInfo;
        })
        .catch(err => { throw new Error(err)});

  }

  /**
   * [getVideoUri description]
   * @method getVideoUri
   * @return {Promise<any>} [description]
   */
async getVideoUri(): Promise<any> {
  return this.camera
        .getPicture({
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          mediaType: 1
        })
  }

  /**
   * [getVideoMeta description]
   * @desc
   * @param  {string}  uri [storage/emulated/0/DCIM/Camera/VID_20161119_075425.mp4]
   * @return {Promise}     [description]
   */
  async getVideoMeta(uri: string): Promise<any> {
      return this.videoEditor
        .getVideoInfo({ fileUri: "file:/" + uri })
        .then(data => {
          if (data.orientation === "portrait") {
            this.notificationService.toastIt(
              "Attention : Format portrait détecté"
            );
            { throw new Error("mode portrait refusé")};
          }
          return data;
        })
        .catch(err => { throw new Error(err)});
  }

  /**
   * [getVideoThumb description]
   * @desc
   * @param  {string}  uri [storage/emulated/0/DCIM/Camera/VID_20161119_075425.mp4]
   * @return {Promise}     [/storage/emulated/0/Android/data/com.ionicframework.tuber560001/files/files/videos/output-name.jpg]
   */
  // date: any;
  async getVideoThumb(uri: string): Promise<any> {
      return this.videoEditor
        .createThumbnail({
          fileUri: "file:/" + uri, // the path to the video on the device
          outputFileName:  Date.now().toString(), // the file name for the JPEG image
          atTime: 10, // optional, location in the video to create the thumbnail (in seconds)
          width: 191, // optional, width of the thumbnail
          height: 340, // optional, height of the thumbnail
          quality: 100 // optional, quality of the thumbnail (between 1 and 100)
        })

  }
}
