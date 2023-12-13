import { Injectable } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Injectable({
  providedIn: 'root'
})
export class StatusbarService {

  constructor() { }

     //status-bar methods
     setStatusBarStyleDark = async () => {
      await StatusBar.setStyle({ style: Style.Default });
    };
    setStatusBarStyleLight = async () => {
      await StatusBar.setStyle({ style: Style.Light });
    };
  
    applyBackgroundColor = async () => {
     await StatusBar.setBackgroundColor({ color: "#16924a" });
    }
}
