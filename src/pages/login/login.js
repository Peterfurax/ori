var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ProfilePage } from "../profile/profile";
import { UserData } from "../../providers/user-data";
import { Component, trigger, state, style, transition, animate, keyframes } from "@angular/core";
import { NavController } from "ionic-angular";
import { VideoListPage } from "../VideoListPage/VideoListPage";
var LoginPage = (function () {
    function LoginPage(navCtrl, userData) {
        this.navCtrl = navCtrl;
        this.userData = userData;
        this.logoState = "in";
        this.cloudState = "in";
        this.loginState = "in";
        this.formState = "in";
        this.submitted = false;
        this.login = {};
        this.profile = {
            "name": "",
            "firstname": "",
            "occupation": "",
            "service": "",
            "compagnie": ""
        };
    }
    LoginPage.prototype.onLogin = function (form) {
        var _this = this;
        this.submitted = true;
        if (form.valid) {
            this.userData.login(this.login.username);
            this.userData.getProfile().then(function (result) {
                if (result === null) {
                    _this.navCtrl.pop();
                    _this.navCtrl.push(ProfilePage);
                    _this.navCtrl.setRoot(VideoListPage);
                }
                _this.navCtrl.pop();
                _this.navCtrl.setRoot(VideoListPage);
            }, function (err) {
                console.error(err);
            });
        }
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Component({
        selector: "page-login",
        templateUrl: "login.html",
        animations: [
            trigger("flyInBottomSlow", [
                state("in", style({
                    transform: "translate3d(0,0,0)"
                })),
                transition("void => *", [
                    style({ transform: "translate3d(0,2000px,0" }),
                    animate("1000ms ease-in-out")
                ])
            ]),
            trigger("flyInBottomFast", [
                state("in", style({
                    transform: "translate3d(0,0,0)"
                })),
                transition("void => *", [
                    style({ transform: "translate3d(0,2000px,0)" }),
                    animate("500ms ease-in-out")
                ])
            ]),
            trigger("bounceInBottom", [
                state("in", style({
                    transform: "translate3d(0,0,0)"
                })),
                transition("void => *", [
                    animate("1000ms 100ms ease-in", keyframes([
                        style({ transform: "translate3d(0,2000px,0)", offset: 0 }),
                        style({ transform: "translate3d(0,-20px,0)", offset: 0.9 }),
                        style({ transform: "translate3d(0,0,0)", offset: 1 })
                    ]))
                ])
            ]),
            trigger("fadeIn", [
                state("in", style({
                    opacity: 1
                })),
                transition("void => *", [
                    style({ opacity: 0 }),
                    animate("500ms 1000ms ease-in")
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [NavController,
        UserData])
], LoginPage);
export { LoginPage };
