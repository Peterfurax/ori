import { Injectable } from "@angular/core";

@Injectable()
export class ServeurIp {
  constructor() {}
  getIp(prod: boolean) {
    return prod ? "http://192.168.0.16:8000" : "http://192.168.0.16:8000";
  }
}
