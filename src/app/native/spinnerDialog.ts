import { Injectable } from "@angular/core";
import { SpinnerDialog } from "@ionic-native/spinner-dialog";

@Injectable()
export class Spinner {
  constructor(private spinnerDialog: SpinnerDialog) {}

  show():void {
    this.spinnerDialog.show();
  }

  hide():void {
    this.spinnerDialog.hide();
  }
}
