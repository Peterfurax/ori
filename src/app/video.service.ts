// declare const cordova;
import { Injectable } from "@angular/core";
import { ParseService } from "./parse.service";
import { NotificationService } from "./notification.service";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { VideoEditor } from "@ionic-native/video-editor";
import { VideoPlay } from "./native/videoPlayer";
import { MediaExtract } from "./native/mediaCapture";
import { LogService } from "./app.log";
import { VideoAllInfo, InfoVideo } from "../app/app.interface";
@Injectable()
export class VideoService {
  constructor(
    private log: LogService,
    private mediaExtract: MediaExtract,
    private videoPlay: VideoPlay,
    private parseService: ParseService,
    private notificationService: NotificationService,
    private camera: Camera,
    private videoEditor: VideoEditor
  ) {}
  videoAllInfo: VideoAllInfo = {
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
  /**
   * [playVideo description]
   * @desc
   * @param {[type]} uri [description]
   * @memberof VideoService
   */
  playVideo(uri): void {
    this.videoPlay.play(uri);
  }

  /**
   * CAPTURE VIDEO FROM CAMERA DEVICE
   * @memberof VideoService
   */

  captureVideo(): void {
    this.mediaExtract
      .captureVideo()
      .then((data: string) => {
        this.log.console("je suis captureVideo " + data);
        this.stockCaptureVideo(data);
      })
      .catch(err => this.log.console(err, true));
  }

  /**
   * [captureImage description]
   * @method captureImage
   * @return {[type]}     [description]
   * @memberof VideoService
   */
  captureImage(): void {
    this.mediaExtract
      .captureImage()
      .then(data => this.log.console(data))
      .catch(err => this.log.console(err, true));
  }

  /**
   * [stockCaptureVideo description]
   * @method stockCaptureVideo
   * @param  {[type]}          uri [file:/storage/emulated/0/DCIM/Camera/VID_20161119_075425.mp4]
   * @return {Promise<any>}        [description]
   * @memberof VideoService
   */
  async stockCaptureVideo(uri: string): Promise<any> {
    return Promise.all([
      this.getVideoMeta(uri),
      this.getVideoThumb(uri),
      this.parseService.convertUriToDate(uri)
    ])
      .then((data: [InfoVideo, string, string]) => {
        this.videoAllInfo.dateImport = Date.now();
        this.videoAllInfo.datePrise = data[2];
        this.videoAllInfo.dateSend = "";
        this.videoAllInfo.resultSend = "";
        this.videoAllInfo.uri = uri;
        this.videoAllInfo.uriThumb = data[1];
        this.videoAllInfo.infoVideo = data[0];
        return this.videoAllInfo;
      })
      .catch(err => {
        this.log.console(err, true);
        throw new Error(err);
      });
  }

  /**
   * [getVideoUri description]
   * @method getVideoUri
   * @return {Promise<any>} [description]
   * @memberof VideoService
   */
  async getVideoUri(): Promise<any> {
    const CameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: 1
    };
    return this.camera.getPicture(CameraOptions);
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
          this.notificationService.notificationMaker(
            "Format portrait refusé",
            true,
            false,
            false
          );
          this.log.console("mode portrait refusé", true);
          throw new Error("mode portrait refusé");
        }
        return data;
      })
      .catch(err => {
        this.log.console(err, true);
        throw new Error(err);
      });
  }

  /**
   * [getVideoThumb description]
   * @desc
   * @param  {string}  uri [storage/emulated/0/DCIM/Camera/VID_20161119_075425.mp4]
   * @return {Promise}     [/storage/emulated/0/Android/data/com.ionicframework.tuber560001/files/files/videos/output-name.jpg]
   */
  // date: any;
  async getVideoThumb(uri: string): Promise<any> {
    return this.videoEditor.createThumbnail({
      fileUri: "file:/" + uri, // the path to the video on the device
      outputFileName: Date.now().toString(), // the file name for the JPEG image
      atTime: 10, // optional, location in the video to create the thumbnail (in seconds)
      width: 191, // optional, width of the thumbnail
      height: 340, // optional, height of the thumbnail
      quality: 100 // optional, quality of the thumbnail (between 1 and 100)
    });
  }
}
