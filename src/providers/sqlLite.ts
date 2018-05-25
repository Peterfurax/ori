import { SQLite, SQLiteObject } from "@ionic-native/sqlite";
import { Injectable } from "@angular/core";
import { UserData } from "./user-data";
@Injectable()
export class SqlLiteData {
  database;
  people: Array<Object>;
  profile: {
    name?: string;
    firstname?: string;
    society?: string;
    occupation?: string;
    service?: string;
  } = {
    name: "",
    firstname: "",
    society: "",
    occupation: "",
    service: ""
  };

  constructor(private sqlite: SQLite, public userData: UserData) {
    this.sqlite
      .create({
        name: "data.db",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        this.database = db;
        this.refresh();
      })
      .catch(err => console.error(err));
  }
  /**
   * [update description]
   * @param {[type]} data [description]
   */
  updateUpload(data) {
    let request = "UPDATE people";
    request += "SET dateSend = '" + data.dateSend + "'";
    request += ", resultSend = '" + data.resultSend + "'";
    request += " WHERE bitrate = '" + data.bitrate + "' ";
    this.database
      .executeSql(request, [])
      .then(data => console.log("UPDATED: ", data))
      .catch(err => console.error("ERROR UPDATED: ", err));
  }
  /**
   * [update description]
   * @param {[type]} data [description]
   */
  update(data) {
    let destArr = data.distributionArr.toString();
    let request = "UPDATE people";
    request += " SET guestfirstname = '" + data.guestfirstname + "'";
    request += ", guestname = '" + data.guestname + "'";
    request += ", guestoccupation = '" + data.guestoccupation + "'";
    request += ", guestS1 = '" + data.guestS1 + "'";
    request += ", guestplace = '" + data.guestplace + "'";
    request += ", guesttext = '" + data.guesttext + "'";
    request += ", distributionsave_rush = '" + data.distributionsave_rush + "'";
    request += ", distributionArr = '" + destArr + "'";
    request += ", dateSend = '" + data.dateSend + "'";
    request += ", resultSend = '" + data.resultSend + "'";
    request += " WHERE bitrate = '" + data.bitrate + "' ";
    this.database
      .executeSql(request, [])
      .then(data => console.log("UPDATED: ", data))
      .catch(err => console.error("ERROR UPDATED: ", err));
    this.refresh();
  }

  /**
   * [getProfile description]
   * @return {Promise} [description]
   */
  getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userData
        .getProfile()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  /**
   * [refresh description]
   * @return {Promise} [description]
   */
  refresh(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database
        .executeSql("SELECT * FROM people", [])
        .then(data => {
          this.people = [];
          if (data.rows.length > 0) {
            for (let i = 0; i < data.rows.length; i++) {
              let destarray = [];
              let val = data.rows.item(i);
              if (val.distributionArr !== null) {
                destarray = val.distributionArr.split(",");
              }
              this.people.push({
                uri: val.uri,
                uriThumb: val.uriThumb,
                bitrate: val.bitrate,
                duration: val.duration,
                height: val.height,
                orientation: val.orientation,
                size: val.size,
                width: val.width,
                guestname: val.guestname,
                guestfirstname: val.guestfirstname,
                guestoccupation: val.guestoccupation,
                guestplace: val.guestplace,
                guestS1: val.guestS1,
                guesttext: val.guesttext,
                journalistname: val.journalistname,
                journalistfirstname: val.journalistfirstname,
                journalistoccupation: val.journalistoccupation,
                journalistsociety: val.journalistsociety,
                journalistservice: val.journalistservice,
                distributionembargo_date: val.distributionembargo_date,
                distributionsave_rush: val.distributionsave_rush,
                distributionArr: destarray,
                dateImport: val.dateImport,
                datePrise: val.datePrise,
                dateSend: val.dateSend,
                resultSend: val.resultSend
              });
            }
            resolve("ok Refresh Database");
          }
        })
        .catch(err => {
          reject(err);
          console.error("ERROR REFRESH: ", err);
        });
    });
  }

  /**
   * [delete description]
   * @param {[type]} uri [description]
   */
  delete(uri) {
    return new Promise((resolve, reject) => {
      this.database
        .executeSql("DELETE FROM people WHERE uri = '" + uri + "'", [])
        .then(data => {
          this.refresh();
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  /**
   * [Insert description]
   * @param  {[type]}  data [description]
   * @return {Promise}      [description]
   */
  Insert(data): Promise<any> {
    console.log("INSERT EN COURS");
    return new Promise((resolve, reject) => {
      this.getProfile()
        .then(result => {
          this.profile = result;
          console.log("DATA TO INSERT", data);
          console.log("DATABASE", this.database);
          let requestSql = "INSERT INTO people (";
          requestSql += "uri,";
          requestSql += "uriThumb,";
          requestSql += "bitrate,";
          requestSql += "duration,";
          requestSql += "height,";
          requestSql += "orientation,";
          requestSql += "size,";
          requestSql += "width,";
          requestSql += "journalistname,";
          requestSql += "journalistfirstname,";
          requestSql += "journalistsociety,";
          requestSql += "journalistoccupation,";
          requestSql += "journalistservice,";
          requestSql += "datePrise,";
          requestSql += "dateImport,";
          requestSql += "dateSend,";
          requestSql += "resultSend";
          requestSql += ") ";
          requestSql += "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          this.database
            .executeSql(requestSql, [
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
              data.dateImport,
              data.dateSend,
              data.resultSend
            ])
            .then(result => {
              console.log("INSERTED: ", result);
              resolve(data.uri);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject("ERROR getProfile: " + err));
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
      "dateExport INT",
      "dateSend INT",
      "resultSend INT"
    ];
    this.database
      .executeSql("DROP TABLE people", [])
      .then(data => console.log("DROP: ", data))
      .catch(err => console.error("ERROR DROP: ", err));
    this.sqlite
      .create({ name: "data.db", location: "default" })
      .then((db: SQLiteObject) => {
        db
          .executeSql(
            "CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT," +
              sqlRow.toString() +
              ")",
            {}
          )
          .then(data => {
            console.log("TABLE CREATED: ", data);
            this.refresh();
          })
          .catch(err => console.error("Unable to execute sql", err));
      })
      .catch(err => console.error("Unable to open database", err));
  }
}
