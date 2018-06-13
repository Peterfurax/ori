// declare const cordova;
import { Injectable } from "@angular/core";
import { Vibration } from "@ionic-native/vibration";
@Injectable()

/**
 * TO DO ? CORRECTION NE FONCTIONNE PLUS
 *  class AppService
 */
export class Vibrate {
  patternVibration: number[] = [100, 200, 100];
  constructor(private vibration: Vibration) {}

  /**
   * @method vibrate
   * @desc natif notification and vibrate
   * @type PromiseAll
   */
  vibrate(patternVibration?: number[]): void {
    this.vibration.vibrate(
      patternVibration ? patternVibration : this.patternVibration
    );
  }
}
