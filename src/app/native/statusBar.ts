import { StatusBar } from "@ionic-native/status-bar";
import { Injectable } from "@angular/core";
@Injectable()
export class StatusBarre {
  constructor(private statusBar: StatusBar) {
  }

  /**
   * [hide splashScreen]
   * @method hide
   */
  hide(): void {
    this.statusBar.hide();
  }


  // this.statusBar.styleDefault();
  // this.statusBar.styleBlackTranslucent();
}
