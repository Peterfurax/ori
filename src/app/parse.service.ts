import { Injectable } from "@angular/core";
import { DateService } from "./date.service";
@Injectable()
export class ParseService {
  constructor(private dateService: DateService) {}

  /**
   * @desc uri To Date
   * @param {string} uriToParse
   * @return {Promise}
   * @memberof ParseService
   */
  async uriToDate(uriToParse: string): Promise<string> {
    let date = await this.dateService.YYYYMMDD_HHmmss(uriToParse);
    return this.dateService.isValid(date) ? date : "error not a validate date";
  }

  /**
   * @desc parse Uri Date
   * @param {string} dateExtract
   * @return {Promise}
   * @memberof ParseService
   */
  async parseUriDate(dateExtract: string): Promise<string> {
    return await this.uriToDate(dateExtract);
  }

  /**
   * @desc uri Extract File
   * @method uriExtractFile
   * @param  {string}   uri
   * @return {Promise}
   * @memberof ParseService
   */
  async uriExtractFile(uri: string): Promise<string> {
    return /[^/]*$/g.exec(uri)[0];
  }

  /**
   * @desc uri Extract File Without Ext
   * @method uriExtractFileWithoutExt
   * @param  {string}   uriExtractFile
   * @return {Promise}
   * @memberof ParseService
   */
  async uriExtractFileWithoutExt(uriExtractFile: string): Promise<string> {
    return /[^.]*/g.exec(await uriExtractFile)[0];
  }

  /**
   * @desc parse Uri
   * @method parseUri
   * @param  {string} uri
   * @return {string}
   */
  async parseUri(uri: string): Promise<any> {
    let t = await this.uriExtractFileWithoutExt(await this.uriExtractFile(uri));
    console.log(t)
    return t
  }

  /**
   * @desc convert Uri To Date
   * @method convertUriToDate
   * @param  {string}         uri
   * @return {Promise<any>}
   */
  async convertUriToDate(uri: string): Promise<any> {
    return await this.parseUriDate(await this.parseUri(uri));
  }
}
