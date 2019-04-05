import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  connectedUsers$: Observable<any>;

  constructor(public chatService: ChatService) { }

  ngOnInit() {
    this.connectedUsers$ = this.chatService.connectedUsers();
  }

}
