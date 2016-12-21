import { Injectable } from "@angular/core"
import { SQLite } from "ionic-native"
import { UserData } from "./user-data"
@Injectable()

export class SqlLiteData {

  database: SQLite
  people: Array<Object>;
  profile: {
    name?: string,
    firstname?: string,
    society?: string,
    occupation?: string,
    service?: string
  } = {
    name: null,
    firstname: null,
    society: null,
    occupation: null,
    service: null
  };

  constructor(public userData: UserData) {
    this.database = new SQLite()
    this.database.openDatabase({
      name: "data.db",
      location: "default"
    }).then(
      () => this.refresh(),
      err => console.error("ERROR openDatabase: ", err)
      )
  }

  /**
   * [update description]
   * @param {[type]} data [description]
   */
  update(data) {
    let destArr = data.distributionArr.toString()
    let request = "UPDATE people"
    request += " SET guestfirstname = '" + data.guestfirstname + "'"
    request += ", guestname = '" + data.guestname + "'"
    request += ", guestoccupation = '" + data.guestoccupation + "'"
    request += ", guestS1 = '" + data.guestS1 + "'"
    request += ", guestplace = '" + data.guestplace + "'"
    request += ", guesttext = '" + data.guesttext + "'"
    request += ", distributionsave_rush = '" + data.distributionsave_rush + "'"
    request += ", distributionArr = '" + destArr + "'"
    request += " WHERE bitrate = '" + data.bitrate + "' "
    this.database.executeSql(request, []).then(
      data => console.log("UPDATED: ", data),
      err => console.error("ERROR UPDATED: ", err)
    )
    this.refresh()
  }

  /**
   * [getProfile description]
   * @return {Promise} [description]
   */
  getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userData.getProfile().then(
        result => resolve(result),
        err => reject(err)
      )
    })
  }


  /**
   * [refresh description]
   * @return {Promise} [description]
   */
  refresh(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.executeSql("SELECT * FROM people", []).then(
        data => {
          this.people = []
          if (data.rows.length > 0) {
            for (let i = 0; i < data.rows.length; i++) {
              let destarray = []
              if (data.rows.item(i).distributionArr !== null) { destarray = data.rows.item(i).distributionArr.split(",") }
              this.people.push({
                uri: data.rows.item(i).uri,
                uriThumb: data.rows.item(i).uriThumb,
                bitrate: data.rows.item(i).bitrate,
                duration: data.rows.item(i).duration,
                height: data.rows.item(i).height,
                orientation: data.rows.item(i).orientation,
                size: data.rows.item(i).size,
                width: data.rows.item(i).width,
                guestname: data.rows.item(i).guestname,
                guestfirstname: data.rows.item(i).guestfirstname,
                guestoccupation: data.rows.item(i).guestoccupation,
                guestplace: data.rows.item(i).guestplace,
                guestS1: data.rows.item(i).guestS1,
                guesttext: data.rows.item(i).guesttext,
                journalistname: data.rows.item(i).journalistname,
                journalistfirstname: data.rows.item(i).journalistfirstname,
                journalistoccupation: data.rows.item(i).journalistoccupation,
                journalistsociety: data.rows.item(i).journalistsociety,
                journalistservice: data.rows.item(i).journalistservice,
                distributionembargo_date: data.rows.item(i).distributionembargo_date,
                distributionsave_rush: data.rows.item(i).distributionsave_rush,
                distributionArr: destarray,
                dateImport: data.rows.item(i).dateImport,
                datePrise: data.rows.item(i).datePrise
              });
            }
            resolve()
            console.log("REFRESH: ", data)
          }
        },
        err => {
          reject(err)
          console.error("ERROR REFRESH: ", err)
        })
    })
  }

  /**
   * [delete description]
   * @param {[type]} uri [description]
   */
  delete(uri) {
    return new Promise((resolve, reject) => {
      this.database.executeSql("DELETE FROM people WHERE uri = '" + uri + "'", []).then(
        data => {
          this.refresh()
          resolve(data)
        },
        err => reject(err)
      )
    })
  }

  /**
   * [Insert description]
   * @param  {[type]}  data [description]
   * @return {Promise}      [description]
   */
  Insert(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getProfile().then(
        result => {
          this.profile = result
          console.log(data)
          let requestSql = "INSERT INTO people ("
          requestSql += "uri,"
          requestSql += "uriThumb,"
          requestSql += "bitrate,"
          requestSql += "duration,"
          requestSql += "height,"
          requestSql += "orientation,"
          requestSql += "size,"
          requestSql += "width,"
          requestSql += "journalistname,"
          requestSql += "journalistfirstname,"
          requestSql += "journalistsociety,"
          requestSql += "journalistoccupation,"
          requestSql += "journalistservice,"
          requestSql += "datePrise,"
          requestSql += "dateImport"
          requestSql += ") "
          requestSql += "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
          this.database.executeSql(requestSql, [
            data.uri,
            data.uriThumb,
            data.infoVideo.bitrate,
            data.infoVideo.duration,
            data.infoVideo.height,
            data.infoVideo.orientation,
            data.infoVideo.size,
            data.infoVideo.width,
            this.profile.name,
            this.profile.firstname,
            this.profile.society,
            this.profile.occupation,
            this.profile.service,
            data.datePrise,
            data.dateImport
          ]).then(
            result => {
              console.log("INSERTED: ", result)
              resolve(data.uri)
            },
            err => reject("ERROR requestSql: ")
            )
        },
        err => reject("ERROR getProfile: ")
      )
    });
  }

  /**
   * [recreate description]
   */
  recreate() {
    const sqlRow = [
      "uri TEXT",
      "uriThumb TEXT",
      "bitrate INT",
      "duration TEXT",
      "height TEXT",
      "orientation TEXT",
      "size TEXT",
      "width TEXT",
      "guestname TEXT",
      "guestfirstname TEXT",
      "guestoccupation TEXT",
      "guestplace TEXT",
      "guestS1 TEXT",
      "guesttext TEXT",
      "journalistname TEXT",
      "journalistfirstname TEXT",
      "journalistoccupation TEXT",
      "journalistsociety TEXT",
      "journalistservice TEXT",
      "distributionembargo_date TEXT",
      "distributionsave_rush TEXT",
      "distributionArr TEXT",
      "dateImport INT",
      "datePrise INT",
      "dateExport INT"
    ]
    this.database.executeSql("DROP TABLE people", []).then(
      data => console.log("DROP: ", data),
      err => console.error("ERROR DROP: ", err)
    )
    let db = new SQLite()
    db.openDatabase({
      name: "data.db",
      location: "default"
    }).then(
      () => {
        db.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT," + sqlRow.toString() + ")", {}).then(
          data => {
            console.log("TABLE CREATED: ", data)
            this.refresh()
          },
          err => console.error("Unable to execute sql", err))
      },
      err => console.error("Unable to open database", err)
      )
  }
}
