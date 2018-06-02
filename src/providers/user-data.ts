import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { Storage } from "@ionic/storage";

// TODO COMMENT ALL !! #comment
@Injectable()
export class UserData {
  // _favorites = [];
  HAS_LOGGED_IN = "hasLoggedIn";

  name?: string;
  firstname?: string;
  society?: string;
  title?: string;
  service?: string;
  constructor(public events: Events, public storage: Storage) {}

  // hasFavorite(sessionName) {
  //   return this._favorites.indexOf(sessionName) > -1;
  // }

  // addFavorite(sessionName) {
  //   this._favorites.push(sessionName);
  // }

  // removeFavorite(sessionName) {
  //   let index = this._favorites.indexOf(sessionName);
  //   if (index > -1) {
  //     this._favorites.splice(index, 1);
  //   }
  // }

  login() {
    console.log(this.storage.ready());
    this.storage.ready().then(() =>
      this.storage
        .length()
        .then(val => {
          console.log(this.storage.driver);
        })
        .then(() => this.storage.keys())
        .then(() => this.storage.keys())
    );
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

  // signup(username) {
  //   Promise.all([
  //     this.storage.set(this.HAS_LOGGED_IN, true),
  //     this.setUsername(username)
  //   ])
  //     .then(() => this.events.publish("user:signup"))
  //     .catch(err => console.error(err));
  // }

  logout() {
    Promise.all([
      this.storage.remove(this.HAS_LOGGED_IN)
      // this.storage.remove("username")
    ])
      .then(() => this.events.publish("user:logout"))
      .catch(err => console.error(err));
  }

  // setUsername(username) {
  //   this.storage.set("username", username);
  // }

  // getUsername() {
  //   return this.storage
  //     .get("username")
  //     .then(data => {
  //       return data;
  //     })
  //     .catch(err => console.error(err));
  // }

  hasLoggedIn() {
    return this.storage
      .get(this.HAS_LOGGED_IN)
      .then(data => {
        return data === true;
      })
      .catch(err => console.error(err));
  }

  // getName() {
  //   return this.storage
  //     .get("name")
  //     .then(data => {
  //       return data;
  //     })
  //     .catch(err => console.error(err));
  // }

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

  // return a promise
  // hasProfile() {
  //   return this.storage
  //     .get("username")
  //     .then(data => {
  //       return data === true;
  //     })
  //     .catch(err => console.error(err));
  // }
}
