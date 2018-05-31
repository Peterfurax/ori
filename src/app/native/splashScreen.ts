import { SplashScreen } from "@ionic-native/splash-screen";
import { Injectable } from "@angular/core";
@Injectable()
export class Splash {
  constructor(private splashScreen: SplashScreen) {}

  /**
   * [hide splashScreen]
   * @method hide
   */
  hide(): void {
    this.splashScreen.hide();
  }
}
