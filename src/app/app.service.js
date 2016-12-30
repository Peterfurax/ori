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
import { SpinnerDialog, BackgroundMode, Vibration, Transfer, VideoPlayer, LocalNotifications, Toast, AppVersion, MediaCapture, Camera, VideoEditor } from "ionic-native";
import * as moment from "moment";
import "moment/src/locale/fr";
var AppService = (function () {
    function AppService() {
        this.appAllInfo = {
            Names: "",
            PackageName: "",
            VersionNumber: ""
        };
    }
    AppService.prototype.appVersionAll = function () {
        var _this = this;
        this.appName = AppVersion.getAppName();
        this.appPackageName = AppVersion.getPackageName();
        this.appVersionNumber = AppVersion.getVersionNumber();
        Promise.all([this.appName, this.appPackageName, this.appVersionNumber]).then(function (data) {
            _this.appAllInfo.Names = data[0];
            _this.appAllInfo.PackageName = data[1];
            _this.appAllInfo.VersionNumber = data[2];
        }, function (err) { });
    };
    AppService.prototype.notificationMaker = function () {
        this.notification();
        this.vibrate([500, 500, 500]);
    };
    AppService.prototype.vibrate = function (param) {
        Vibration.vibrate(param);
    };
    AppService.prototype.notification = function () {
        LocalNotifications.schedule({
            title: "Application Video",
            text: "message",
            sound: "file://assets/sound/notification_ok.mp3"
        });
    };
    return AppService;
}());
AppService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], AppService);
export { AppService };
var VideoService = (function () {
    function VideoService() {
        this.videoAllInfo = {
            dateImport: 0,
            datePrise: "",
            uri: "",
            uriThumb: "",
            infoVideo: {
                bitrate: 0,
                duration: 0,
                height: 0,
                orientation: "",
                size: 0,
                width: 0
            }
        };
        moment.locale("fr");
    }
    VideoService.prototype.notificationMaker = function (message) {
        this.notification(message);
        this.vibrate([500, 500, 500]);
    };
    VideoService.prototype.notification = function (message) {
        LocalNotifications.schedule({
            title: "Application Video",
            text: message,
            sound: "file://assets/sound/notification_ok.mp3"
        });
    };
    VideoService.prototype.vibrate = function (param) {
        Vibration.vibrate(param);
    };
    VideoService.prototype.toast = function (message) {
        Toast.show(message, "5000", "center").subscribe(function (toast) { return console.log(toast); });
    };
    VideoService.prototype.playVideo = function (uri) {
        uri = "file:/" + uri;
        VideoPlayer.play(uri).then(function () { return console.log("video completed"); }, function (err) { return console.log(err); });
    };
    VideoService.prototype.captureVideo = function () {
        var _this = this;
        MediaCapture.captureVideo().then(function (data) { return _this.stockCaptureVideo(data); }, function (err) { return console.error(err); });
    };
    VideoService.prototype.captureImage = function () {
        MediaCapture.captureImage().then(function (data) { return console.log(data); }, function (err) { return console.error(err); });
    };
    VideoService.prototype.uriToDate = function (uriParse) {
        return new Promise(function (resolve, reject) {
            var date = moment(uriParse, "YYYYMMDD_HHmmss").toISOString();
            if (!moment(date).isValid()) {
                reject("error parsing uriToDate");
            }
            resolve(date);
        });
    };
    VideoService.prototype.parseUriDate = function (dateExtract) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.uriToDate(dateExtract).then(function (data) { return resolve(data); }, function (err) { return reject(err); });
        });
    };
    VideoService.prototype.parseUri = function (uri) {
        var uriFile = (/[^/]*$/g).exec(uri);
        var dateExtract = (/[^.]*/g).exec(uriFile[0]);
        return dateExtract[0];
    };
    VideoService.prototype.convertUriToDate = function (uri) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.parseUriDate(_this.parseUri(uri)).then(function (data) { return resolve(data); }, function (err) { return reject(err); });
        });
    };
    VideoService.prototype.stockCaptureVideo = function (uri) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            Promise.all([_this.getVideoMeta(uri), _this.getVideoThumb(uri), _this.convertUriToDate(uri)]).then(function (data) {
                _this.videoAllInfo.infoVideo = data[0];
                _this.videoAllInfo.uriThumb = data[1];
                _this.videoAllInfo.datePrise = data[2];
                _this.videoAllInfo.dateImport = Date.now();
                _this.videoAllInfo.uri = uri;
                resolve(_this.videoAllInfo);
            }, function (err) { return reject(err); });
        });
    };
    VideoService.prototype.getVideoUri = function () {
        return new Promise(function (resolve, reject) {
            Camera.getPicture({
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                mediaType: 1
            }).then(function (data) { return resolve(data); }, function (err) { return reject(err); });
        });
    };
    VideoService.prototype.getVideoMeta = function (uri) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            uri = "file:/" + uri;
            VideoEditor.getVideoInfo({ fileUri: uri }).then(function (data) {
                if (data.orientation === "portrait") {
                    _this.toast("Rejet : Format portrait détecté");
                    reject("portrait");
                }
                resolve(data);
            }, function (err) { return reject(err); });
        });
    };
    VideoService.prototype.getVideoThumb = function (uri) {
        var _this = this;
        this.date = Date.now();
        return new Promise(function (resolve, reject) {
            uri = "file:/" + uri;
            VideoEditor.createThumbnail({
                fileUri: uri,
                outputFileName: _this.date,
                atTime: 10,
                width: 320,
                height: 480,
                quality: 100
            })
                .then(function (data) { return resolve(data); }, function (err) { return reject(err); });
        });
    };
    VideoService.prototype.upload = function (item) {
        var _this = this;
        this.uploadInitService();
        Promise.all([this.witreJsonMetaToUpload(), this.uploadVideo(item.uri)]).then(function (data) { return _this.uploadEndService(data); }, function (err) { return _this.uploadEndService(err); });
    };
    VideoService.prototype.uploadInitService = function () {
        SpinnerDialog.show(this.progress);
        BackgroundMode.enable();
    };
    VideoService.prototype.uploadEndService = function (message) {
        message = JSON.stringify(message);
        SpinnerDialog.hide();
        BackgroundMode.disable();
        this.notificationMaker(message);
        this.toast(message);
    };
    VideoService.prototype.uploadVideo = function (uri) {
        var _this = this;
        var fileTransfer = new Transfer();
        var perc = 0;
        return new Promise(function (resolve, reject) {
            var optionsVideo = {
                mimeType: "video/mp4",
                timeout: 3000,
                fileName: Date.now() + ".mp4"
            };
            fileTransfer.onProgress(function (progressEvent) {
                if (progressEvent.lengthComputable) {
                    perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                    _this.progress = perc;
                    console.log(_this.progress);
                }
            });
            fileTransfer.upload(uri, "http://192.168.0.12:8000", optionsVideo).then(function (data) { return resolve(data); }, function (err) { return reject(err); });
        });
    };
    VideoService.prototype.witreJsonMetaToUpload = function () {
    };
    VideoService.prototype.BgEnable = function () {
        BackgroundMode.enable();
    };
    return VideoService;
}());
export { VideoService };
