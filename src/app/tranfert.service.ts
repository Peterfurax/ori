declare const cordova;
import { Injectable } from "@angular/core";
import { FileService } from "./file.service";
import { NotificationService } from "./notification.service";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
  FileUploadResult
} from "@ionic-native/file-transfer";
import { SqlLiteData } from "../providers/sqlLite";
import { DateService } from "./date.service";
import { ServeurIp } from "./SERVER_IP";
import { LogService } from "./app.log";
import { FullInfo } from "./app.interface";
@Injectable()
export class TransfertService {
  constructor(
    private log: LogService,
    private dateService: DateService,
    private fileService: FileService,
    private notificationService: NotificationService,
    private sqlLiteData: SqlLiteData,
    private transfer: FileTransfer,
    private serveurIp: ServeurIp
  ) {}
  progress: ProgressEvent;
  UploadApply(item: FullInfo, promiseReturnFnc, value: FileUploadResult): void {
    console.log("UploadApply value", value);
    this.log.console(this.serveurIp.getIp(false));
    // item.resultSend = JSON.stringify(value);
    item.resultSend = value;
    this.log.console(item);
    Promise.all([
      this.sqlLiteData.update(item),
      this.notificationService.uploadEndService(value),
      promiseReturnFnc()
    ])
      .then(log => this.log.console(log))
      .catch(err => this.log.console(err, true));
  }

  /**
   * [progress description]
   * @type {any}
   */
  upload(item: FullInfo): Promise<any> {
    return new Promise((resolve, reject) => {
      this.notificationService.uploadInitService();
      let metaForZenon = {
        video_metadata: {
          distribution: {
            title: item.guesttext,
            description: item.guesttext,
            duration: item.duration,
            society: item.journalistsociety,
            service: item.journalistservice,
            embargo_date: "",
            save_rush: item.distributionsave_rush,
            destinations: item.distributionArr
          },
          incrustation_tags: {
            "journalist.firstname": item.journalistfirstname,
            "journalist.name": item.journalistname,
            "journalist.occupation": item.journalistoccupation,
            // "journalist.place": item.journalistplace,
            // "journalist.text": item.journalisttext,
            // "journalist.s1": item.journalists1,
            "guest.firstname": item.guestfirstname,
            "guest.name": item.guestname,
            "guest.occupation": item.guestoccupation,
            "guest.place": item.guestplace,
            "guest.text": item.guesttext
            // "guest.s1": item.guests1
          }
        }
      };
      this.fileService
        .WriteJsonMeta(metaForZenon)
        .then(jsonUri => {
          let exportName = this.dateService.exportNameDate();
          this.log.console(exportName);
          item.dateSend = Date.now();
          Promise.all([
            this.uploadFile(exportName, jsonUri, "json", item),
            this.uploadFile(exportName, item.uri, "mp4", item),
            this.uploadFile(
              exportName,
              cordova.file.dataDirectory + "fin.txt",
              "txt",
              item
            ),
            this.fileService.checkFileTxt()
          ])
            .then(data => {
              console.log("ddd",data);
              this.uploadFile(
                exportName,
                cordova.file.dataDirectory + "fin.txt",
                "txt",
                item
              )
                .then(result => this.UploadApply(item, resolve, result))
                .catch(err => this.UploadApply(item, reject, err));
            })
            .catch(err => this.UploadApply(item, reject, err));
        })
        .catch(err => this.UploadApply(item, reject, err));
    });
  }

  optionFileTransferMaker(exportName: string, type: string): FileUploadOptions {
    let optionFileTransfer: FileUploadOptions = {
      mimeType: "text/plain",
      fileName: exportName
    };
    switch (type) {
      case "mp4":
        optionFileTransfer.mimeType = "video/mp4";
        optionFileTransfer.fileName += ".mp4";
        return optionFileTransfer;
      case "json":
        optionFileTransfer.mimeType = "application/json;charset=utf-8";
        optionFileTransfer.fileName += ".json";
        return optionFileTransfer;
      case "txt":
        optionFileTransfer.fileName += ".txt";
        return optionFileTransfer;
      default:
        return optionFileTransfer;
    }
  }

  uploadFile(
    exportName: string,
    uri: string,
    type: string,
    item: FullInfo
  ): Promise<FileUploadResult> {
    return new Promise((resolve, reject) => {
      item.upload = true;
      let percentage = 0;
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.onProgress((progress: ProgressEvent) => {
        if (progress.lengthComputable) {
          percentage = Math.floor((progress.loaded / progress.total) * 100);
          item.progress = percentage;
        }
      });
      fileTransfer
        .upload(
          uri,
          this.serveurIp.getIp(false),
          this.optionFileTransferMaker(exportName, type)
        )
        .then((data: FileUploadResult) => {
          item.upload=false
          resolve(data);
        })
        .catch(err => {
          item.upload=false
          reject(err);
        });
    });
  }
}
