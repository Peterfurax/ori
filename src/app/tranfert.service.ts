declare const cordova
import { Injectable } from "@angular/core"
import { FileService } from "./file.service"
import { NotificationService } from "./notification.service"
import { Transfer } from "ionic-native"
import { SqlLiteData } from "../providers/sqlLite"
@Injectable()

/**
 *  class VideoService
 */
export class TransfertService {
  constructor(
    public fileService: FileService,
    public notificationService: NotificationService,
    public sqlLiteData: SqlLiteData
  ) { }

  exportNameMaker() {
    return Date.now().toString()
  }

  /**
   * [progress description]
   * @type {any}
   */
  progress: any
  upload(item): Promise<any> {
    return new Promise((resolve, reject) => {
      this.notificationService.uploadInitService()
      console.log(item.toString())
      let metaForZenon = {
        "video_metadata": {
          "distribution": {
            "title": item.guesttext,
            "description": item.guesttext,
            "duration": item.duration,
            "society": item.journalistsociety,
            "service": item.journalistservice,
            "embargo_date": "",
            "save_rush": item.distributionsave_rush,
            "destinations": item.distributionArr
          },
          "incrustation_tags": {
            "journalist.firstname": item.journalistfirstname,
            "journalist.name": item.journalistname,
            "journalist.occupation": item.journalistoccupation,
            "journalist.place": item.journalistplace,
            "journalist.text": item.journalisttext,
            // "journalist.s1": item.journalists1,
            "guest.firstname": item.guestfirstname,
            "guest.name": item.guestname,
            "guest.occupation": item.guestoccupation,
            "guest.place": item.guestplace,
            "guest.text": item.guesttext
            // "guest.s1": item.guests1
          }
        }
      }
      console.log(metaForZenon)
      this.fileService.WriteJsonMeta(metaForZenon).then((jsonUri) => {
        let exportName = this.exportNameMaker()
        item.dateSend = Date.now()
        Promise.all([
          this.uploadFile(exportName, jsonUri, "json", item),
          this.uploadFile(exportName, item.uri, "mp4", item),
          this.fileService.checkFileTxt()
        ]).then(
          data => this.uploadFile(exportName, cordova.file.dataDirectory + "fin.txt", "txt", item).then(
            (result) => {
              this.resolveUpload(item, resolve, result)
            },
            err => {
              this.rejectUpload(item, reject, err)
            }),
          err => {
            this.rejectUpload(item, reject, err)
          })
      }, err => {
        this.rejectUpload(item, reject, err)
      })
    })
  }

  resolveUpload(item, resolve, result) {
    item.resultSend = result.toString()
    this.sqlLiteData.update(item)
    this.notificationService.uploadEndService(result)
    resolve()
  }

  rejectUpload(item, reject, err) {
    item.resultSend = err.toString()
    this.sqlLiteData.update(item)
    this.notificationService.uploadEndService(err)
    reject()
  }


  uploadFile(exportName: string, uri: string, type: string, item): Promise<any> {
    console.log(uri)
    const fileTransfer = new Transfer()
    let perc = 0
    let fileNameExport = exportName
    return new Promise((resolve, reject) => {
      let optionFileTransfer
      if (type === "mp4") {
        console.log("mp4")
        optionFileTransfer = {
          mimeType: "video/mp4",
          timeout: 3000,
          fileName: fileNameExport + ".mp4"
        }
      }
      if (type === "json") {
        console.log("json")
        optionFileTransfer = {
          mimeType: "application/json",
          timeout: 3000,
          fileName: fileNameExport + ".json"
        }
      }
      if (type === "txt") {
        console.log("txt")
        // uri = cordova.file.dataDirectory + "fin.txt"
        console.log("uri for txt", uri)
        optionFileTransfer = {
          mimeType: "text/plain",
          timeout: 3000,
          fileName: fileNameExport + ".txt"
        }
      }

      fileTransfer.onProgress(
        progressEvent => {
          if (progressEvent.lengthComputable) {
            perc = Math.floor(progressEvent.loaded / progressEvent.total * 100)
            item.progress = perc
          }
        }
      )
      fileTransfer.upload(uri, "http://192.168.0.12:8000", optionFileTransfer).then(
        data => resolve(data),
        err => reject(err)
      )
    })
  }


















}
