import { Injectable } from "@angular/core"

import { Events } from "ionic-angular"
import { Storage } from "@ionic/storage"


@Injectable()
export class UserData {
  _favorites = []
  HAS_LOGGED_IN = "hasLoggedIn"

  name?: string
  firstname?: string
  society?: string
  title?: string
  service?: string
  constructor(public events: Events, public storage: Storage) { }

  hasFavorite(sessionName) {
    return (this._favorites.indexOf(sessionName) > -1)
  }

  addFavorite(sessionName) {
    this._favorites.push(sessionName)
  }

  removeFavorite(sessionName) {
    let index = this._favorites.indexOf(sessionName)
    if (index > -1) {
      this._favorites.splice(index, 1)
    }
  }

  login(username) {
    this.storage.set(this.HAS_LOGGED_IN, true)
    this.setUsername(username)
    this.events.publish("user:login")
  }

  signup(username) {
    this.storage.set(this.HAS_LOGGED_IN, true)
    this.setUsername(username)
    this.events.publish("user:signup")
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN)
    this.storage.remove("username")
    this.events.publish("user:logout")

  }

  setUsername(username) {
    this.storage.set("username", username)
  }

  getUsername() {
    return this.storage.get("username").then(data => {
      return data
    })
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then(data => {
      return data === true
    })
  }

  getName() {
    return this.storage.get("name").then(data => {
      console.log("yes ", data)
      return data
    })
  }


  setProfile(profile) {
    console.log(profile)
    this.storage.set("profile", profile)
  }



  getProfile() {
    return this.storage.get("profile").then(data => {
      return data
    })
  }

  clearProfile() {
    this.storage.clear()
  }


  // return a promise
  hasProfile() {
    return this.storage.get("username").then(data => {
      return data === true
    })
  }











}
