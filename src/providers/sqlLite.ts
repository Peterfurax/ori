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
      })
      .then(async () => {
        await this.refresh();
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
  async update(data) {
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
      .then(async () => await this.refresh())
      .catch(err => console.error("ERROR UPDATED: ", err));
  }

  /**
   * [getProfile description]
   * @return {Promise} [description]
   */
  async getProfile(): Promise<any> {
    this.userData
      .getProfile()
      .then(result => {
        return result;
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  convertNullString(val: any) {
    return val === "null" ? "" : val;
  }

  /**
   * [refresh description]
   * @return {Promise} [description]
   */
  async refresh(): Promise<any> {
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
              guestname: this.convertNullString(val.guestname),
              guestfirstname: this.convertNullString(val.guestfirstname),
              guestoccupation: this.convertNullString(val.guestoccupation),
              guestplace: this.convertNullString(val.guestplace),
              guestS1: this.convertNullString(val.guestS1),
              guesttext: this.convertNullString(val.guesttext),
              journalistname: this.convertNullString(val.journalistname),
              journalistfirstname: this.convertNullString(
                val.journalistfirstname
              ),
              journalistoccupation: this.convertNullString(
                val.journalistoccupation
              ),
              journalistsociety: this.convertNullString(val.journalistsociety),
              journalistservice: this.convertNullString(val.journalistservice),
              distributionembargo_date: val.distributionembargo_date,
              distributionsave_rush: val.distributionsave_rush,
              distributionArr: destarray,
              dateImport: val.dateImport,
              datePrise: val.datePrise,
              dateSend: val.dateSend,
              resultSend: val.resultSend
            });
          }
          return "ok Refresh Database";
        }
      })
      .catch(err => {
        console.error("ERROR REFRESH: ", err);
        throw new Error(err);
      });
  }

  /**
   * [delete description]
   * @param {[type]} uri [description]
   */
  async delete(uri) {
    this.database
      .executeSql("DELETE FROM people WHERE uri = '" + uri + "'", [])
      .then(async data => {
        await this.refresh();
        return data;
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * [Insert description]
   * @param  {[type]}  data [description]
   * @return {Promise}      [description]
   */
  async Insert(data): Promise<any> {
    console.log("INSERT EN COURS");
    await this.getProfile()
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
            return data.uri;
          })
          .catch(err => {
            throw new Error(err);
          });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * [recreate description]
   */
  recreate(): void {
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
