import { Injectable } from "@angular/core";
@Injectable()
export class LogService {
  constructor() {}
  // TODO write log
  /**
   * log err main function
   * @method log
   * @param  {any}    message any
   * @return {string}         message stringify
   */
  console(message: any, error?: boolean): void {
    error ? console.error(message) : console.log(message);
  }
}
