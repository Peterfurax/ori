import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { Storage } from "@ionic/storage";

// TODO COMMENT ALL !! #comment
@Injectable()
export class UserData {
  HAS_LOGGED_IN = "hasLoggedIn";

  constructor(public events: Events, public storage: Storage) {}

  login2() {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.storage.set(this.HAS_LOGGED_IN, true)
        // this.setUsername(username)
      ])
        .then(() => {
          this.events.publish("user:login");
          resolve({ storageSetLogin: true });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  login():void {
    this.storage
      .set(this.HAS_LOGGED_IN, true)
      .then(() => {
        this.events.publish("user:login");
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  logout():void {
      this.storage.remove(this.HAS_LOGGED_IN)
      .then(() => this.events.publish("user:logout"))
      .catch(err => console.error(err));
  }

  hasLoggedIn() {
    return this.storage
      .get(this.HAS_LOGGED_IN)
      .then(data => {
        return data === true;
      })
      .catch(err => console.error(err));
  }

  setProfile(profile) {
    this.storage.set("profile", profile);
  }

  getProfile() {
    return this.storage
      .get("profile")
      .then(data => {
        return data;
      })
      .catch(err => console.error(err));
  }

  clearProfile() {
    this.storage.clear();
  }
}
