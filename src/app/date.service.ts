import { Injectable } from "@angular/core";
import * as moment from "moment";
/**
 *
 *
 * @export
 * @class DateService
 */
@Injectable()
export class DateService {
  constructor() {
    moment.locale("fr");
  }

  /**
   *
   * @desc YYYYMMDD_HHmmss date with moment
   * @param {string} uriParse
   * @returns {string}
   * @memberof ParseService
   */
  YYYYMMDD_HHmmss(uriParse: string) {
    return moment(uriParse, "YYYYMMDD_HHmmss").toISOString();
  }

  /**
   *
   * @desc Valide date with moment
   * @param {string} date
   * @returns {boolean}
   * @memberof ParseService
   */
  valide(date: string) {
    return moment(date).isValid() ? true : false;
  }

  /**
   *
   * @desc name date with moment
   * @returns {object}
   * @memberof DateService
   */
  exportNameDate() {
    return moment().format("YYYYMMDDHHmmss");
  }
}
