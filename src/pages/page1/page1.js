var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { VideoService, AppService } from "../../app/app.service";
import { NavController } from "ionic-angular";
import { UserData } from "../../providers/user-data";
import { SqlLiteData } from "../../providers/sqlLite";
var Page1 = (function () {
    function Page1(navCtrl, serviceVideo, serviceApp, userData, storageSql) {
        this.navCtrl = navCtrl;
        this.serviceVideo = serviceVideo;
        this.serviceApp = serviceApp;
        this.userData = userData;
        this.storageSql = storageSql;
        this.serviceApp.appVersionAll();
    }
    Page1.prototype.ca = function () {
        this.serviceVideo.captureVideo();
    };
    Page1.prototype.storageSqlClear = function () {
        this.storageSql.recreate();
    };
    Page1.prototype.sessionStorageClear = function () {
        this.userData.clearProfile();
    };
    Page1.prototype.pro = function () {
        this.serviceApp.notificationMaker();
    };
    Page1.prototype.VideoUri = function () {
        this.serviceVideo.getVideoUri();
    };
    return Page1;
}());
Page1 = __decorate([
    Component({
        selector: "page-page1",
        templateUrl: "page1.html"
    }),
    __metadata("design:paramtypes", [NavController,
        VideoService,
        AppService,
        UserData,
        SqlLiteData])
], Page1);
export { Page1 };
