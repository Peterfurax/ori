import { Injectable } from "@angular/core"
import {
  // SpinnerDialog,
  BackgroundMode,
  Vibration,
  LocalNotifications,
  Toast
} from "ionic-native"
@Injectable()

/**
 *
 */
export class NotificationService {
  constructor() { }
  // TODO
  /**
   * [uploadInitService description]
   * @method uploadInitService
   * @return {[type]}          [description]
   */
  uploadInitService() {
    // SpinnerDialog.show()
    BackgroundMode.enable()
  }
  /* FIXME */
  /**
   * [uploadEndService description]
   * @method uploadEndService
   * @param  {string}         message [description]
   * @return {[type]}                 [description]
   */
  uploadEndService(message?: any) {
    message = JSON.stringify(message)
    console.dir(message)
    // SpinnerDialog.hide()
    this.notificationMaker(message)

  }

  /**
   * [notificationMaker description]
   * @method notificationMaker
   * @param  {[type]}          message [description]
   * @return {[type]}                  [description]
   */
  notificationMaker(message) {
    // this.notification(message)
    // this.vibrate([500, 200, 500])
    // this.toast(message)
    BackgroundMode.disable()
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
      sound: "file://assets/sound/notification_ok.mp3"
    })
  }

  /**
   * [vibrate description]
   * @desc
   * @param {any} param [description]
   */
  vibrate(param: any) {
    Vibration.vibrate(param)
  }

  /**
   * [toast description]
   * @desc
   * @param {any} message [description]
   */
  toast(message: any) {
    Toast.show(message, "5000", "center").subscribe(
      toast => console.log(toast)
    )
  }

}
