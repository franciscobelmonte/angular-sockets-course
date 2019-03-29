import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { message } from '../../../../../01-server/sockets/socket';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  message = '';
  messagesSubscription: Subscription;
  messagesReceived: any[] = [];

  element: HTMLElement;

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.element = document.getElementById('chat-messages');

    this.messagesSubscription = this.chatService.listenMessages().subscribe((msg) => {
      console.log(msg);
      this.messagesReceived.push(msg);

      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
  }

  send () {
    if (this.message.trim().length === 0) {
      return;
    }

    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
