import {Injectable} from "@angular/core";
import { SpinnerDialog } from "@ionic-native/spinner-dialog";
import { BackgroundMode } from "@ionic-native/background-mode";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Toast } from "@ionic-native/toast";
import { Vibration } from "@ionic-native/vibration";

@Injectable()
export /**
 *
 */
class NotificationService {
  constructor(
  private spinnerDialog: SpinnerDialog,
  private backgroundMode: BackgroundMode,
  private vibration: Vibration,
  private localNotifications: LocalNotifications,
  private toast: Toast
) {}
  /**
   * [uploadInitService description]
   * @method uploadInitService
   * @return {[type]}          [description]
   */
  uploadInitService() {
    Promise.all([this.spinnerDialog.show(), this.backgroundMode.enable()])
      .then(() => {
        console.log("uploadInitService ok");
      })
      .catch(err => {
        console.log(err);
      });
  }
  /**
   * [uploadEndService description]
   * @method uploadEndService
   * @param  {string}         message [description]
   * @return {[type]}                 [description]
   */
  uploadEndService(message?: any) {
    Promise.all([
      this.notificationMaker(JSON.stringify(message)),
      this.spinnerDialog.hide(),
    ])
      .then(() => {
        console.log("uploadEndService ok");
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * [notificationMaker description]
   * @method notificationMaker
   * @param  {[type]}          message [description]
   * @return {[type]}                  [description]
   */
  notificationMaker(message?: any) {
    Promise.all([
      this.notification(message),
      this.vibrate([500, 200, 500]),
      this.toastIt(message),
    ])
      .then(() => {
        this.backgroundMode.disable();
      })
      .catch(() => {
        this.backgroundMode.disable();
      });
  }

  /**
   * [notification description]
   * @method notification
   * @param  {any}        message [description]
   * @return {[type]}             [description]
   */
  notification(message: any) {
    this.localNotifications.schedule({
      title: "Application Video",
      text: message,
      sound: "file://assets/sound/notification_ok.mp3",
    });
  }

  /**
   * [vibrate description]
   * @desc
   * @param {any} param [description]
   */
  vibrate(param: any) {
    this.vibration.vibrate(param);
  }

  /**
   * [toast description]
   * @desc
   * @param {any} message [description]
   */
  toastIt(message: any) {
    this.toast.show(message, "5000", "center").subscribe(toast =>
      console.log(toast));
  }
}
