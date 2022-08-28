import { Component, OnInit } from '@angular/core';
import { ISetting } from 'src/app/shared/models/settings.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-app',
  template: `<app-layout></app-layout>`,
})
export class AppComponent implements OnInit {

  // private ws: WebSocket;

  constructor(private apiService: ApiService) {
    // this.ws = new WebSocket("ws://localhost:5000/send");
    // this.ws.onopen = async () => {
    //   console.log("connected");

    // }
    // this.ws.onmessage = (msg: MessageEvent) => {
    //   let message = JSON.parse(msg.data);
    //   console.log(msg);

    // }
    // setTimeout(() => {

    //   this.sendMessage({ data: "Qosuldum" })
    // }, 5000);
  }

  ngOnInit(): void {
    this.getSetting()

  }

  // private sendMessage(message: any) {
  //   this.ws.send(JSON.stringify(message))
  // }


  private getSetting(): void {
    this.apiService.getSetting().subscribe({
      next: res => {
        sessionStorage.setItem('setting', JSON.stringify(res.data))

      }
    })
  }

}
