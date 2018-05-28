import { Injectable } from "@angular/core";
import {
  MediaCapture,
  MediaFile,
  CaptureError,
  CaptureImageOptions
} from "@ionic-native/media-capture";

@Injectable()

/**
 * MediaExtract on device
 * @class MediaExtract
 */
export class MediaExtract {
  constructor(private mediaCapture: MediaCapture) {}

  /**
   * CAPTURE VIDEO FROM CAMERA DEVICE
   * @method captureVideo
   * @function Load native camera device { MediaCapture } from "ionic-native"
   * @type {Promise}
   * @param null
   * @return  Promise<any>
   * @example [fullPath: "file:/storage/emulated/0/DCIM/Camera/VID_20161119_075425.mp4", lastModified: null, lastModifiedDate:1479538465000, localURL: "cdvfile://localhost/sdcard/DCIM/Camera/VID_20161119_075425.mp4", name: "VID_20161119_075425.mp4", size:561702,start:0, type: "video/mp4"]
   */
  captureVideo(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.mediaCapture
        .captureVideo()
        .then((data: MediaFile[]) => resolve(data))
        .catch((err: CaptureError) => reject(err));
    });
  }

  captureImage(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.mediaCapture
        .captureImage()
        .then((data: MediaFile[]) => resolve(data))
        .catch((err: CaptureError) => reject(err));
    });
  }
}
