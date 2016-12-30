var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { SQLite } from "ionic-native";
import { UserData } from "./user-data";
var SqlLiteData = (function () {
    function SqlLiteData(userData) {
        var _this = this;
        this.userData = userData;
        this.profile = {
            name: null,
            firstname: null,
            society: null,
            occupation: null,
            service: null
        };
        this.database = new SQLite();
        this.database.openDatabase({
            name: "data.db",
            location: "default"
        }).then(function () { return _this.refresh(); }, function (err) { return console.error("ERROR openDatabase: ", err); });
    }
    SqlLiteData.prototype.update = function (data) {
        var destArr = data.distributionArr.toString();
        var request = "UPDATE people";
        request += " SET guestfirstname = '" + data.guestfirstname + "'";
        request += ", guestname = '" + data.guestname + "'";
        request += ", guestoccupation = '" + data.guestoccupation + "'";
        request += ", guestS1 = '" + data.guestS1 + "'";
        request += ", guestplace = '" + data.guestplace + "'";
        request += ", guesttext = '" + data.guesttext + "'";
        request += ", distributionsave_rush = '" + data.distributionsave_rush + "'";
        request += ", distributionArr = '" + destArr + "'";
        request += " WHERE bitrate = '" + data.bitrate + "' ";
        this.database.executeSql(request, []).then(function (data) { return console.log("UPDATED: ", data); }, function (err) { return console.error("ERROR UPDATED: ", err); });
        this.refresh();
    };
    SqlLiteData.prototype.getProfile = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.userData.getProfile().then(function (result) { return resolve(result); }, function (err) { return reject(err); });
        });
    };
    SqlLiteData.prototype.refresh = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.database.executeSql("SELECT * FROM people", []).then(function (data) {
                _this.people = [];
                if (data.rows.length > 0) {
                    for (var i = 0; i < data.rows.length; i++) {
                        var destarray = [];
                        if (data.rows.item(i).distributionArr !== null) {
                            destarray = data.rows.item(i).distributionArr.split(",");
                        }
                        _this.people.push({
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
                    resolve();
                    console.log("REFRESH: ", data);
                }
            }, function (err) {
                reject(err);
                console.error("ERROR REFRESH: ", err);
            });
        });
    };
    SqlLiteData.prototype.delete = function (uri) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.database.executeSql("DELETE FROM people WHERE uri = '" + uri + "'", []).then(function (data) {
                _this.refresh();
                resolve(data);
            }, function (err) { return reject(err); });
        });
    };
    SqlLiteData.prototype.Insert = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getProfile().then(function (result) {
                _this.profile = result;
                console.log(data);
                var requestSql = "INSERT INTO people (";
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
                requestSql += "dateImport";
                requestSql += ") ";
                requestSql += "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                _this.database.executeSql(requestSql, [
                    data.uri,
                    data.uriThumb,
                    data.infoVideo.bitrate,
                    data.infoVideo.duration,
                    data.infoVideo.height,
                    data.infoVideo.orientation,
                    data.infoVideo.size,
                    data.infoVideo.width,
                    _this.profile.name,
                    _this.profile.firstname,
                    _this.profile.society,
                    _this.profile.occupation,
                    _this.profile.service,
                    data.datePrise,
                    data.dateImport
                ]).then(function (result) {
                    console.log("INSERTED: ", result);
                    resolve(data.uri);
                }, function (err) { return reject("ERROR requestSql: "); });
            }, function (err) { return reject("ERROR getProfile: "); });
        });
    };
    SqlLiteData.prototype.recreate = function () {
        var _this = this;
        var sqlRow = [
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
        ];
        this.database.executeSql("DROP TABLE people", []).then(function (data) { return console.log("DROP: ", data); }, function (err) { return console.error("ERROR DROP: ", err); });
        var db = new SQLite();
        db.openDatabase({
            name: "data.db",
            location: "default"
        }).then(function () {
            db.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT," + sqlRow.toString() + ")", {}).then(function (data) {
                console.log("TABLE CREATED: ", data);
                _this.refresh();
            }, function (err) { return console.error("Unable to execute sql", err); });
        }, function (err) { return console.error("Unable to open database", err); });
    };
    return SqlLiteData;
}());
SqlLiteData = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UserData])
], SqlLiteData);
export { SqlLiteData };
