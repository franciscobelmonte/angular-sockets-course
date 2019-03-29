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

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.messagesSubscription = this.chatService.listenMessages().subscribe((msg) => {
      console.log(msg);
    });
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
  }

  send () {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
