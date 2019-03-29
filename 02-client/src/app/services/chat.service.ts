import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) { }

  sendMessage (message: string) {
    const payload = {
      from: this.wsService.getUser().name,
      message: message
    };

    this.wsService.emit('message', payload);
  }

  listenMessages () {
    return this.wsService.listen('new-message');
  }

  listenPrivateMessages () {
    return this.wsService.listen('private-message');
  }
}
