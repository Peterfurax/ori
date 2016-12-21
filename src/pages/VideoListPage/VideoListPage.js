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
import { NavController, Platform, NavParams } from "ionic-angular";
import { SqlLiteData } from "../../providers/sqlLite";
import { UserData } from "../../providers/user-data";
var VideoDetailsPage = (function () {
    function VideoDetailsPage(params, storageSql, navController) {
        this.storageSql = storageSql;
        this.navController = navController;
        this.person = params.data.person;
    }
    VideoDetailsPage.prototype.logForm = function () {
        this.storageSql.update(this.person);
        this.navController.pop();
    };
    return VideoDetailsPage;
}());
VideoDetailsPage = __decorate([
    Component({
        templateUrl: "navigation-details.html",
    }),
    __metadata("design:paramtypes", [NavParams, SqlLiteData, NavController])
], VideoDetailsPage);
export { VideoDetailsPage };
var VideoListPage = (function () {
    function VideoListPage(navController, platform, serviceVideo, serviceApp, storage, storageSql) {
        this.navController = navController;
        this.platform = platform;
        this.serviceVideo = serviceVideo;
        this.serviceApp = serviceApp;
        this.storage = storage;
        this.storageSql = storageSql;
        this.showUploadBar = false;
        this.show = false;
    }
    VideoListPage.prototype.delete = function (uri) {
        this.storageSql.delete(uri);
    };
    VideoListPage.prototype.openDetailOnImport = function () {
        var _this = this;
        this.storageSql.refresh().then(function () {
            _this.openNavDetailsPage(_this.storageSql.people[_this.storageSql.people.length - 1]);
        }, function (err) {
            console.log(err);
        });
    };
    VideoListPage.prototype.playVideo = function (uri) {
        this.serviceVideo.playVideo(uri);
    };
    VideoListPage.prototype.upload = function (item) {
        this.serviceVideo.upload(item);
        this.showUploadBar = !this.showUploadBar;
    };
    VideoListPage.prototype.add = function () {
        var _this = this;
        this.people = [];
        this.serviceVideo.getVideoUri().then(function (uri) {
            _this.serviceVideo.stockCaptureVideo(uri).then(function (result) {
                _this.storageSql.Insert(result).then(function (result) {
                    _this.openDetailOnImport();
                }, function (err) { console.error("ERROR storageSql.Insert : ", err); });
            }, function (err) { console.error("ERROR serviceVideo.stockCaptureVideo : ", err); });
        }, function (err) { console.error("ERROR serviceVideo.getVideoUri : ", err); });
    };
    VideoListPage.prototype.openNavDetailsPage = function (person) {
        console.log(person);
        this.navController.push(VideoDetailsPage, { person: person });
    };
    VideoListPage.prototype.clicked = function () {
        this.show = !this.show;
    };
    return VideoListPage;
}());
VideoListPage = __decorate([
    Component({
        selector: "page-VideoListPage",
        templateUrl: "VideoListPage.html"
    }),
    __metadata("design:paramtypes", [NavController,
        Platform,
        VideoService,
        AppService,
        UserData,
        SqlLiteData])
], VideoListPage);
export { VideoListPage };
