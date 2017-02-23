declare const cordova
import { Injectable } from "@angular/core"
import { ParseService} from "./parse.service"
import {
  File
} from "ionic-native"
@Injectable()

/**
 *
 */
export class FileService {
  constructor(
    public parseService: ParseService
  ) { }

  /**
   * [deleteDataJson description]
   * @method deleteDataJson
   * @return {[type]}       [description]
   */
  // deleteDataJson() {
  //   File.removeFile(cordova.file.dataDirectory, this.fileName).then(
  //     result => { console.log("delete OK ", result) },
  //     err => { console.log("delete ERR", err) })
  // }

  /**
   * [createJsonDir description]
   * @method createJsonDir
   * @return {[type]}      [description]
   */
  // createJsonDir() {
  //   File.createDir(cordova.file.dataDirectory, "json/", true).then(
  //     result => { console.log("createJsonDir OK", result) },
  //     err => { console.log("createJsonDir", err) })
  // }

  // read() {
  //   File.readAsText(cordova.file.dataDirectory, this.fileName).then(result => { console.log("readAsText OK ", result) }, err => { console.log("readAsText ERR", err) })
  // }
  //
  /**
   * [checkFileJsonMeta description]
   * @method checkFileJsonMeta
   * @param  {string}          uriExtractFile [description]
   * @return {[type]}                         [description]
   */
  checkFileJsonMeta(uriExtractFile: string) {
    return new Promise((resolve, reject) => {
      File.checkFile(cordova.file.dataDirectory, uriExtractFile).then(
        result => {
          File.removeFile(cordova.file.dataDirectory, uriExtractFile).then(
            result => { resolve(result) },
            err => { reject(err) })
        },
        err => {
          resolve()
        })
    })
  }

  checkFileTxt() {
    // File.listDir(cordova.file.dataDirectory, "").then(
    //   result => { console.log("listDir OK", result) },
    //   err => {
    //     console.log("listDir", err)
    //   })
    return new Promise((resolve, reject) => {
      const txtPath = cordova.file.dataDirectory + "fin.txt"
      File.checkFile(cordova.file.dataDirectory, "fin.txt").then(
        result => {
          resolve()
          //         File.createFile(cordova.file.dataDirectory, "fin.txt", true).then(
          //           () => { resolve(cordova.file.dataDirectory + "fin.txt") },
          //           err => { reject(err) })
          // File.createFile(cordova.file.dataDirectory, "fin.txt", true).then(
          //   result => { resolve(txtPath) },
          //   err => { reject(err) })
        },
        err => {
          File.createFile(cordova.file.dataDirectory, "fin.txt", true).then(
            result => { resolve(txtPath) },
            err => { reject(err) })
        })
    })
  }



  /**
   * [WriteJsonMeta description]
   * @method WriteJsonMeta
   * @param  {any}          item [description]
   * @return {Promise<any>}      [description]
   */
  WriteJsonMeta(item: any): Promise<any> {
    // let uriExtractFile = this.uriExtractFile(item.uri)
    let uriExtractFileWithoutExt = this.parseService.parseUri(item.uri)
    return new Promise((resolve, reject) => {
      this.checkFileJsonMeta(uriExtractFileWithoutExt + ".json").then(
        value => {
          File.writeFile(cordova.file.dataDirectory, uriExtractFileWithoutExt + ".json", JSON.stringify(item), true).then(
            () => { resolve(cordova.file.dataDirectory + uriExtractFileWithoutExt + ".json") },
            err => { reject(err) })
        },
        err => {
          reject(err)
        })
    })
  }

  /**
   * [WriteTxtMeta description]
   * @method WriteTxtMeta
   * @param  {any}          item [description]
   * @return {Promise<any>}      [description]
   */
  // WriteTxtMeta(item: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     // let uriExtractFileWithoutExt = this.parseUri(item.uri)
  //     this.checkFileTxtMeta(uriExtractFileWithoutExt + ".txt").then(
  //       value => {
  //         File.createFile(cordova.file.dataDirectory, "fin.txt", true).then(
  //           () => { resolve(cordova.file.dataDirectory + "fin.txt") },
  //           err => { reject(err) })
  //       },
  //       err => {
  //         reject(err)
  //       })
  //   })
  // }

}
