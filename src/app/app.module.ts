import { NgModule } from "@angular/core"
import { IonicApp, IonicModule } from "ionic-angular"
import { MyApp } from "./app.component"
import { VideoService, AppService } from "./app.service"
import { LogService } from "./app.log"
import { Page1 } from "../pages/page1/page1"
import { VideoListPage, VideoDetailsPage } from "../pages/videoListPage/videoListPage"
import { LoginPage } from "../pages/login/login"
import { ProfilePage, ProfileDetailsPage } from "../pages/profile/profile"
import { UserData } from "../providers/user-data"
import { Storage } from "@ionic/storage"
import { SqlLiteData } from "../providers/sqlLite"
@NgModule({
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
})
export class AppModule { }
