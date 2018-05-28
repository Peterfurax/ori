import { Injectable } from "@angular/core";
import { LocalNotifications } from "@ionic-native/local-notifications";

@Injectable()
export class LocalNotif {
  constructor(private localNotifications: LocalNotifications) {}
  title: string = "Application Video";
  sound: string = "file://assets/sound/notification_ok.mp3";

  /**
   * LocalNotifications description
   * @method notifications
   * @param  {string}        message [message to send]
   */
  notifications(text: string, title?: string, sound?: string): void {
    this.localNotifications.schedule({
      title: title ? title : this.title,
      text: text,
      sound: sound ? sound : this.sound
    });
  }
}
