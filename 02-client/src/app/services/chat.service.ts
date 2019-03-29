import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketService) { }

  sendMessage (message: string) {
    const payload = {
      from: 'Francisco',
      message: message
    };

    this.wsService.emit('message', payload);
  }

  listenMessages () {
    return this.wsService.listen('new-message');
  }
}
