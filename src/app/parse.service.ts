import { Injectable } from "@angular/core"
import * as moment from "moment"
import "moment/src/locale/fr"
@Injectable()

export class ParseService {
  constructor() { moment.locale("fr"); }
  /**
   * []
   * @desc
   * @param {string} uriParse [description]
   * @return {Promise}     [description]
   */
  uriToDate(uriParse: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let date = moment(uriParse, "YYYYMMDD_HHmmss").toISOString()
      if (!moment(date).isValid()) { reject("error parsing uriToDate") }
      resolve(date)
    })
  }

  /**
   * [parseUriDate description]
   * @desc
   * @param {string} dateExtract [description]
   * @return {Promise}     [description]
   */
  parseUriDate(dateExtract: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.uriToDate(dateExtract).then(
        data => resolve(data),
        err => reject(err)
      )
    })
  }

  /**
   * [uriExtractFile description]
   * @method uriExtractFile
   * @param  {string}   uri [description]
   * @return {[type]}       [description]
   */
  uriExtractFile(uri: string) {
    return (/[^/]*$/g).exec(uri)[0]
  }

  /**
   * [uriExtractFileWithoutExt description]
   * @method uriExtractFileWithoutExt
   * @param  {Object}                 arr [description]
   * @return {[type]}                     [description]
   */
  uriExtractFileWithoutExt(uriExtractFile: string) {
    return (/[^.]*/g).exec(uriExtractFile)[0]
  }

  /**
   * [parseUri description]
   * @method parseUri
   * @param  {string} uri [description]
   * @return {[type]}     [description]
   */
  parseUri(uri: string) {
    return this.uriExtractFileWithoutExt(this.uriExtractFile(uri))
  }

  /**
   * [convertUriToDate description]
   * @method convertUriToDate
   * @param  {string}         uri [description]
   * @return {Promise<any>}       [description]
   */
  convertUriToDate(uri: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.parseUriDate(this.parseUri(uri)).then(
        data => resolve(data),
        err => reject(err)
      )
    })
  }
}
