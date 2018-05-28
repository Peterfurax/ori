import { Injectable } from "@angular/core";
import { VideoPlayer } from "@ionic-native/video-player";
@Injectable()
/**
 * Video Player
 * @class VideoPlay
 */
export class VideoPlay {
  constructor(private videoPlayer: VideoPlayer) {}

  /**
   * @description play video by uri
   * @method play
   * @param {string} uri
   * @memberof VideoPlay
   * @returns {void}
   */
  play(uri: string): void {
    this.videoPlayer
      .play("file://" + uri)
      .then(() => console.log("video completed"))
      .catch(err => console.log(err));
  }
}
