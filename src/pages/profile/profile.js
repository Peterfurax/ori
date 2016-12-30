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
import { NavController, NavParams } from "ionic-angular";
import { UserData } from "../../providers/user-data";
import { VideoService } from "../../app/app.service";
var ProfileDetailsPage = (function () {
    function ProfileDetailsPage(params, navController, userData, serviceVideo) {
        this.params = params;
        this.navController = navController;
        this.userData = userData;
        this.serviceVideo = serviceVideo;
        this.profile = params.data.profile;
    }
    ProfileDetailsPage.prototype.test = function () {
        this.serviceVideo.captureImage();
    };
    ProfileDetailsPage.prototype.logForm = function () {
        this.userData.setProfile(this.profile);
        this.navController.pop();
    };
    return ProfileDetailsPage;
}());
ProfileDetailsPage = __decorate([
    Component({
        templateUrl: "profile-details.html"
    }),
    __metadata("design:paramtypes", [NavParams,
        NavController,
        UserData,
        VideoService])
], ProfileDetailsPage);
export { ProfileDetailsPage };
var ProfilePage = (function () {
    function ProfilePage(navCtrl, userData, navController) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.userData = userData;
        this.navController = navController;
        this.profile = {
            "name": "",
            "firstname": "",
            "occupation": "",
            "service": "",
            "society": ""
        };
        this.userData.getProfile().then(function (ProfileResult) {
            console.log(ProfileResult);
            if (ProfileResult === null) {
                _this.navController.push(ProfileDetailsPage, { profile: _this.profile });
            }
            else {
                _this.profile = ProfileResult;
            }
        }, function (err) { return console.error(err); });
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log("Hello ProfilePage Page");
    };
    ProfilePage.prototype.editProfile = function () {
        this.navController.push(ProfileDetailsPage, { profile: this.profile });
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Component({
        selector: "page-profile",
        templateUrl: "profile.html"
    }),
    __metadata("design:paramtypes", [NavController,
        UserData,
        NavController])
], ProfilePage);
export { ProfilePage };
