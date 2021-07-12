import {Component, OnInit} from '@angular/core';
import {SignalService} from "./signal.service";
import * as signalR from '@microsoft/signalr';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  title = 'SignalRTest';


  constructor(private service: SignalService) {
    // this.title = title;

  }

  ngOnInit(): void {
    this.service.getWeather().subscribe(res => {
      console.log(res);
    })

    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Information)
      .withUrl(environment.baseUrl + '/chatHub')
      .build();

    connection.start().then(function () {
      console.log('SignalR Connected!');
      setTimeout(() => {
        connection.invoke("SendMessage", 'xinyu', 'hello signalR').catch(function (err) {
          return console.error(err.toString());
        });
      }, 5000);
    }).catch(function (err) {
      return console.error(err.toString());
    });

    connection.on("ReceiveMessage", function (user, message) {
      console.log('receive message' + user + message);
    });
  }


}
