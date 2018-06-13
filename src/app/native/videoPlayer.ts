import { Injectable } from "@angular/core";
import { VideoPlayer } from "@ionic-native/video-player";
@Injectable()
/**
 * Video Player
 * @class VideoPlay
 */
export class VideoPlay {
  constructor(private videoPlayer: VideoPlayer) { }

  /**
   * @description play video by uri
   * @method play
   * @param {string} uri
   * @memberof VideoPlay
   * @returns {Promise}
   */
  async play(uri: string): Promise<any> {
    return this.videoPlayer
      .play("file://" + uri)
      .then(() => {
        return "video completed";
      })
      .catch(err => {
        return err;
      });
  }
}
