var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from "@angular/core";
import { IonicApp, IonicModule } from "ionic-angular";
import { MyApp } from "./app.component";
import { VideoService, AppService } from "./app.service";
import { LogService } from "./app.log";
import { Page1 } from "../pages/page1/page1";
import { VideoListPage, VideoDetailsPage } from "../pages/videoListPage/videoListPage";
import { LoginPage } from "../pages/login/login";
import { ProfilePage, ProfileDetailsPage } from "../pages/profile/profile";
import { UserData } from "../providers/user-data";
import { Storage } from "@ionic/storage";
import { SqlLiteData } from "../providers/sqlLite";
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            Page1,
            VideoListPage,
            VideoDetailsPage,
            LoginPage,
            ProfilePage,
            ProfileDetailsPage
        ],
        imports: [
            IonicModule.forRoot(MyApp)
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            Page1,
            VideoListPage,
            VideoDetailsPage,
            LoginPage,
            ProfilePage,
            ProfileDetailsPage
        ],
        providers: [VideoService, AppService, LogService, UserData, Storage, SqlLiteData]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
export { AppModule };
