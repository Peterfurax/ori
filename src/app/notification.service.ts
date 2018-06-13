import { Injectable } from "@angular/core";
// import { Spinner } from "./native/spinnerDialog";
import { Background } from "./native/backgroudMode";
import { LocalNotif } from "./native/localNofication";
import { Toasted } from "./native/toast";
import { Vibrate } from "./native/vibration";

@Injectable()
export class NotificationService {
  constructor(
    private localNotif: LocalNotif,
    // private spinner: Spinner,
    private background: Background,
    private toasted: Toasted,
    private vibrate: Vibrate
  ) {}

  /**
   * [uploadInitService description]
   * @method uploadInitService
   * @return {[type]}          [description]
   */
  uploadInitService(): void {
    this.background.enable()
    // Promise.all([this.background.enable()])
    //   .then(() => console.log("uploadInitService ok"))
    //   .catch(err => console.error(err));
  }

  // uploadInitService1(): void {
  //   Promise.all([this.spinner.show(), this.background.enable()])
  //     .then(() => console.log("uploadInitService ok"))
  //     .catch(err => console.error(err));
  // }

  /**
   * [uploadEndService description]
   * @method uploadEndService
   * @param  {string}         message [description]
   * @return {[type]}                 [description]
   */
  uploadEndService(message: any): void {
    this.notificationMaker(JSON.stringify(message), true, true, false)
    // Promise.all([
    //   this.notificationMaker(JSON.stringify(message), true, true, false),
    //   this.spinner.hide()
    // ])
    //   .then(() => console.log("uploadEndService ok"))
    //   .catch(err => console.error(err));
  }

  /**
   * [notificationMaker description]
   * @method notificationMaker
   * @param {string} message
   * @param {boolean} [vibrate]
   * @param {boolean} [toast]
   * @memberof NotificationService
   */
  notificationMaker(
    message: string,
    toast: boolean,
    localNotif: boolean,
    vibrate: boolean
  ): void {
    Promise.all([
      localNotif ? this.localNotif.notifications(message) : () => {},
      vibrate ? this.vibrate.vibrate() : () => {},
      toast ? this.toasted.toastIt(message) : () => {}
    ])
      .then(() => this.background.disable())
      .catch(() => this.background.disable());
  }
}
