import { NgModule } from "@angular/core"
import { IonicApp, IonicModule } from "ionic-angular"
import { MyApp } from "./app.component"
import { VideoService, AppService } from "./app.service"
import { LogService } from "./app.log"
import { LoginPage } from "../pages/login/login"
import { About } from "../pages/About/About"
import { VideoListPage } from "../pages/VideoListPage/VideoListPage"
import { VideoMeta } from "../pages/VideoMeta/VideoMeta"
import { ProfilePage } from "../pages/profile/profile"
import { ProfileDetailsPage } from "../pages/profile/profile-details"
import { UserData } from "../providers/user-data"
import { Storage } from "@ionic/storage"
import { SqlLiteData } from "../providers/sqlLite"
@NgModule({
  declarations: [
    MyApp,
    About,
    VideoListPage,
    VideoMeta,
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
    About,
    VideoListPage,
    VideoMeta,
    LoginPage,
    ProfilePage,
    ProfileDetailsPage
  ],
  providers: [VideoService, AppService, LogService, UserData, Storage, SqlLiteData]
})
export class AppModule { }
