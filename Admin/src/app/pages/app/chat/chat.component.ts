import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private ws: WebSocket;
  public message: any;
  constructor(private http: HttpClient) {
    this.ws = new WebSocket("ws://localhost:5100/send");
    this.ws.onopen = async () => {
      const keepAlive = setInterval(e => {
        if (this.ws.readyState == 1) {
          this.sendMessage({ event: 'user_action', data: "ping" })
        } else {
          clearInterval(keepAlive)
        }
      }, 10000)

      console.log("connected");

    }
    this.ws.onmessage = (msg: MessageEvent) => {
      console.log(msg);

      let message = JSON.parse(msg.data);

      if (message.event == "user-text") {
        this.message = message.data

      }

    }
    // setTimeout(() => {

    //   // this.sendMessage({ data: "Qosuldum" })
    // }, 5000);
  }

  ngOnInit(): void {
  }

  public sendMessage(message: any) {
    // let mes = { event: "user-text", data: message }
    this.ws.send(JSON.stringify(message))
  }

  public sendClientMessage(message: any) {
    let mes = { event: "user-text", data: message }
    this.ws.send(JSON.stringify(mes))
    console.log(mes);

  }
}
