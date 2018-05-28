import { NgModule } from "@angular/core";
import { IonicApp, IonicModule } from "ionic-angular";
import { MyApp } from "./app.component";
import { SqlLiteData } from "../providers/sqlLite";
import { AppService } from "./app.service";
import { VideoService } from "./video.service";
import { ParseService } from "./parse.service";
import { NotificationService } from "./notification.service";
import { FileService } from "./file.service";
import { TransfertService } from "./tranfert.service";
import { LogService } from "./app.log";
import { LoginPage } from "../pages/login/login";
import { About } from "../pages/About/About";
import { VideoListPage } from "../pages/VideoListPage/VideoListPage";
import { VideoMeta } from "../pages/VideoMeta/VideoMeta";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { ProfileMeta } from "../pages/ProfileMeta/ProfileMeta";
import { UserData } from "../providers/user-data";
import { IonicStorageModule } from "@ionic/storage";
import { BrowserModule } from "@angular/platform-browser";
import { Vibration } from "@ionic-native/vibration";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { AppVersion } from "@ionic-native/app-version";
import { File } from "@ionic-native/file";
import { SpinnerDialog } from "@ionic-native/spinner-dialog";
import { BackgroundMode } from "@ionic-native/background-mode";
import { Toast } from "@ionic-native/toast";
import { VideoPlayer } from "@ionic-native/video-player";
import { SQLite } from "@ionic-native/sqlite";
import { MediaCapture } from "@ionic-native/media-capture";
import { Camera } from "@ionic-native/camera";
import { VideoEditor } from "@ionic-native/video-editor";
import { FileTransfer } from "@ionic-native/file-transfer";
import { Spinner } from "./native/spinnerDialog";
import { Background } from "./native/backgroudMode";
import { LocalNotif } from "./native/localNofication";
import { Toasted } from "./native/toast";
import { Vibrate } from "./native/vibration";
import { VideoPlay } from "./native/videoPlayer";
import { MediaExtract } from "./native/mediaCapture";

import { DateService } from "./date.service";
import { FilterPipeMeta, FilterPipeSend } from "./filter.pipe";

// import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
@NgModule({
  declarations: [
    MyApp,
    About,
    VideoListPage,
    VideoMeta,
    LoginPage,
    ProfilePage,
    ProfileMeta,
    FilterPipeMeta,
    FilterPipeSend
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
  providers: [
    DateService,
    Spinner,
    Background,
    LocalNotif,
    Toasted,
    Vibrate,
    SqlLiteData,
    VideoService,
    AppService,
    ParseService,
    NotificationService,
    FileService,
    TransfertService,
    LogService,
    UserData,
    SplashScreen,
    StatusBar,
    Vibration,
    LocalNotifications,
    AppVersion,
    File,
    SpinnerDialog,
    BackgroundMode,
    Toast,
    VideoPlayer,
    SQLite,
    MediaCapture,
    Camera,
    VideoEditor,
    FileTransfer,
    VideoPlay,
    MediaExtract
  ]
})
export class AppModule {}
