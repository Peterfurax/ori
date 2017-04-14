import { NgModule } from "@angular/core"
import { IonicApp, IonicModule } from "ionic-angular"
import { MyApp } from "./app.component"
import { SqlLiteData } from "../providers/sqlLite"
import { AppService } from "./app.service"
import { VideoService } from "./video.service"
import { ParseService } from "./parse.service"
import { NotificationService } from "./notification.service"
import { FileService } from "./file.service"
import { TransfertService } from "./tranfert.service"
import { LogService } from "./app.log"
import { LoginPage } from "../pages/login/login"
import { About } from "../pages/About/About"
import { VideoListPage } from "../pages/VideoListPage/VideoListPage"
import { VideoMeta } from "../pages/VideoMeta/VideoMeta"
import { ProfilePage } from "../pages/ProfilePage/ProfilePage"
import { ProfileMeta } from "../pages/ProfileMeta/ProfileMeta"
import { UserData } from "../providers/user-data"
import { IonicStorageModule } from "@ionic/storage"
import { BrowserModule } from "@angular/platform-browser"
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
@NgModule({
  declarations: [
    MyApp,
    About,
    VideoListPage,
    VideoMeta,
    LoginPage,
    ProfilePage,
    ProfileMeta
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    About,
    VideoListPage,
    VideoMeta,
    LoginPage,
    ProfilePage,
    ProfileMeta
  ],
  providers: [SqlLiteData, VideoService, AppService, ParseService, NotificationService, FileService, TransfertService, LogService, UserData]
})
export class AppModule { }
