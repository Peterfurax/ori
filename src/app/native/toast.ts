import { Injectable } from "@angular/core";
import { Toast } from "@ionic-native/toast";

@Injectable()
export class Toasted {
  constructor(private toast: Toast) {}

  duration: string = "5000";
  position: string = "center";

  /**
   * @method toastIt
   * @desc toast message on device
   * @param {string} message [description]
   */
  toastIt(message: string, duration?: string, position?: string):void {
    this.toast
      .show(
        message,
        duration ? duration : this.duration,
        position ? position : this.position
      )
      .subscribe(toast => {});
  }

  /**
   * @method hide
   * @desc hide toast message on device
   * @memberof Toasted
   */
  hide(): void {
    this.toast.hide();
  }
}
