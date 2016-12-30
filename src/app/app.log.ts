import { Injectable } from "@angular/core"
@Injectable()

export class LogService {
  constructor() { }

  /**
   * [test the typeof and always return a string]
   * @method stringifyLog
   * @param  {any}        message [any]
   * @return {string}             [always a string]
   */
  stringifyLog(message: any) {
    // if null
    if (message === null) return "null message"
    // if object
    if (typeof message === "object") return JSON.stringify(message)
    // if boolean or everything else...
    return message.toString()
  }

  /**
   * [log err main function]
   * @method log
   * @param  {any}    message [any]
   * @return {string}         [message stringify]
   */
  log(message: any) { console.error(this.stringifyLog(message)) }
}
