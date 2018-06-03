import { Injectable } from "@angular/core";

@Injectable()
export class ServeurIp {
  constructor() {}
  private prod: string = "http://192.168.0.16:8000";
  private dev: string = "http://192.168.0.16:8000";

  getIp(prod: boolean) {
    return prod ? this.prod : this.dev;
  }
}
