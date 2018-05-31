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
  async uriToDate(uriParse: string): Promise<string> {
    let date = await this.dateService.YYYYMMDD_HHmmss(uriParse);
    return this.dateService.valide(date) ? date : "error not a valide date";
  }

  /**
   * @desc parse Uri Date
   * @param {string} dateExtract
   * @return {Promise}
   * @memberof ParseService
   */
  async parseUriDate(dateExtract: string): Promise<any> {
    return await this.uriToDate(dateExtract)
  }

  /**
   * @desc uri Extract File
   * @method uriExtractFile
   * @param  {string}   uri
   * @return {string}
   * @memberof ParseService
   */
  async uriExtractFile(uri: string): Promise<string> {
    return /[^/]*$/g.exec(uri)[0];
  }

  /**
   * @desc uri Extract File Without Ext
   * @method uriExtractFileWithoutExt
   * @param  {Object}   arr
   * @return {string}
   * @memberof ParseService
   */
  async uriExtractFileWithoutExt(uriExtractFile: string): Promise<any> {
    return /[^.]*/g.exec(await uriExtractFile)[0];
  }

  /**
   * @desc parse Uri
   * @method parseUri
   * @param  {string} uri
   * @return {string}
   */
  async parseUri(uri: string): Promise<any> {
    return await this.uriExtractFileWithoutExt(await this.uriExtractFile(uri));
  }

  /**
   * @desc convert Uri To Date
   * @method convertUriToDate
   * @param  {string}         uri
   * @return {Promise<any>}
   */
  async convertUriToDate(uri): Promise<any> {
    return await this.parseUriDate(await this.parseUri(uri));
  }
}
