import { Injectable } from "@angular/core";
import { DateService } from "./date.service";
@Injectable()
export class ParseService {
  constructor(private dateService: DateService) {}

  /**
   * @desc uri To Date
   * @param {string} uriParse
   * @return {Promise}
   * @memberof ParseService
   */
  uriToDate(uriParse: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let date = this.dateService.YYYYMMDD_HHmmss(uriParse);
      this.dateService.valide(date)
        ? resolve(date)
        : reject("error parsing uriToDate");
    });
  }

  /**
   * @desc parse Uri Date
   * @param {string} dateExtract
   * @return {Promise}
   * @memberof ParseService
   */
  parseUriDate(dateExtract: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.uriToDate(dateExtract)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  /**
   * @desc uri Extract File
   * @method uriExtractFile
   * @param  {string}   uri
   * @return {string}
   * @memberof ParseService
   */
  uriExtractFile(uri: string) {
    return /[^/]*$/g.exec(uri)[0];
  }

  /**
   * @desc uri Extract File Without Ext
   * @method uriExtractFileWithoutExt
   * @param  {Object}   arr
   * @return {string}
   * @memberof ParseService
   */
  uriExtractFileWithoutExt(uriExtractFile: string) {
    return /[^.]*/g.exec(uriExtractFile)[0];
  }

  /**
   * @desc parse Uri
   * @method parseUri
   * @param  {string} uri
   * @return {string}
   */
  parseUri(uri: string) {
    return this.uriExtractFileWithoutExt(this.uriExtractFile(uri));
  }

  /**
   * @desc convert Uri To Date
   * @method convertUriToDate
   * @param  {string}         uri
   * @return {Promise<any>}
   */
  convertUriToDate(uri: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.parseUriDate(this.parseUri(uri))
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
}
