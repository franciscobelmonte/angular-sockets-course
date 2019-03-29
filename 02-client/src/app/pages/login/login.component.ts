import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name = '';

  constructor(public wsService: WebsocketService, private router: Router) { }

  ngOnInit() {
  }

  login () {
    this.wsService.login(this.name).then(() => {
      this.router.navigateByUrl('/messages');
    });
  }

}
