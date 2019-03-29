import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name = '';

  constructor(public wsService: WebsocketService) { }

  ngOnInit() {
  }

  login () {
    this.wsService.login(this.name);
  }

}
