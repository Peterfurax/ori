var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { Events, MenuController, Nav, Platform } from "ionic-angular";
import { StatusBar, Splashscreen, SQLite } from "ionic-native";
import { Page1 } from "../pages/page1/page1";
import { VideoListPage } from "../pages/VideoListPage/VideoListPage";
import { LoginPage } from "../pages/login/login";
import { UserData } from "../providers/user-data";
import { ProfilePage } from "../pages/profile/profile";
var MyApp = (function () {
    function MyApp(userData, platform, events, menu) {
        var _this = this;
        this.userData = userData;
        this.platform = platform;
        this.events = events;
        this.menu = menu;
        this.rootPage = LoginPage;
        this.appPages = [
            { title: "A Propos", component: Page1, icon: "information-circle" },
        ];
        this.loggedInPages = [
            { title: "Videos", component: VideoListPage, icon: "videocam" },
            { title: "Compte", component: ProfilePage, icon: "contact" },
            { title: "Déconnecter", component: LoginPage, icon: "log-out", logsOut: true }
        ];
        this.loggedOutPages = [
            { title: "Connecter", component: LoginPage, icon: "log-in" }
        ];
        this.initializeApp();
        this.userData.hasLoggedIn().then(function (hasLoggedIn) {
            _this.enableMenu(hasLoggedIn === true);
            _this.rootPage = LoginPage;
        }, function (err) { return console.error(err); });
        this.listenToLoginEvents();
    }
    MyApp.prototype.initializeApp = function () {
        this.platform.ready().then(function () {
            StatusBar.styleDefault();
            Splashscreen.hide();
            var db = new SQLite();
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
            db.openDatabase({ name: "data.db", location: "default" }).then(function () {
                db.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT," + sqlRow.toString() + ")", {}).then(function (data) { return console.log("TABLE CREATED: ", data); }, function (err) { return console.error("Unable to execute sql", err); });
            }, function (err) { return console.error("Unable to open database", err); });
        }, function (err) { return console.error(err); });
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        this.nav.setRoot(page.component);
        if (page.logsOut === true) {
            setTimeout(function () {
                _this.userData.logout();
            }, 1000);
        }
    };
    MyApp.prototype.listenToLoginEvents = function () {
        var _this = this;
        this.events.subscribe("user:login", function () { return _this.enableMenu(true); }, function (err) { return console.error(err); });
        this.events.subscribe("user:signup", function () { return _this.enableMenu(true); }, function (err) { return console.error(err); });
        this.events.subscribe("user:logout", function () { return _this.enableMenu(false); }, function (err) { return console.error(err); });
    };
    MyApp.prototype.enableMenu = function (loggedIn) {
        console.log(loggedIn);
        this.menu.enable(loggedIn, "loggedInMenu");
        this.menu.enable(!loggedIn, "loggedOutMenu");
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: "app.html"
    }),
    __metadata("design:paramtypes", [UserData, Platform, Events, MenuController])
], MyApp);
export { MyApp };
