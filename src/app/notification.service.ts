import {Injectable} from "@angular/core";
import {
  SpinnerDialog,
  BackgroundMode,
  Vibration,
  LocalNotifications,
  Toast,
} from "ionic-native";
@Injectable()
export /**
 *
 */
class NotificationService {
  constructor() {}
  /**
   * [uploadInitService description]
   * @method uploadInitService
   * @return {[type]}          [description]
   */
  uploadInitService() {
    Promise.all([SpinnerDialog.show(), BackgroundMode.enable()])
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
      SpinnerDialog.hide(),
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
      this.toast(message),
    ])
      .then(() => {
        BackgroundMode.disable();
      })
      .catch(() => {
        BackgroundMode.disable();
      });
  }

  /**
   * [notification description]
   * @method notification
   * @param  {any}        message [description]
   * @return {[type]}             [description]
   */
  notification(message: any) {
    LocalNotifications.schedule({
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
    Vibration.vibrate(param);
  }

  /**
   * [toast description]
   * @desc
   * @param {any} message [description]
   */
  toast(message: any) {
    Toast.show(message, "5000", "center").subscribe(toast =>
      console.log(toast));
  }
}
