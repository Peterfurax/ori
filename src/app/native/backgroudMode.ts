import { Injectable } from "@angular/core";
import { BackgroundMode } from "@ionic-native/background-mode";
/**
 * BackgroundMode force device
 * @class Background
 */
@Injectable()
export class Background {
  constructor(private backgroundMode: BackgroundMode) {}
  /**
   * enable background mode
   * @method enable
   * @memberof Background
   */
  enable(): void {
    this.backgroundMode.enable();
  }
  /**
   * Disable background mode
   * @method disable
   * @memberof Background
   */
  disable(): void {
    this.backgroundMode.disable();
  }
}
