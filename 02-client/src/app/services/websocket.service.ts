import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  public user: User = null;

  constructor(private socket: Socket, private router: Router) {
    this.loadUserFromStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.socketStatus = true;
      this.loadUserFromStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected to server');
      this.socketStatus = false;
    });
  }

  emit (event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  listen (event: string) {
    return this.socket.fromEvent(event);
  }

  login (name) {
    return new Promise((resolve, reject) => {
      this.emit('configure-user', {name}, (response) => {
        this.user = new User(name);
        this.saveUserInStorage();
        resolve();
      });
    });
  }

  logout () {
    this.user = null;
    localStorage.removeItem('user');
    this.emit('configure-user', {name: 'without-name'}, () => {});
    this.router.navigateByUrl('');
  }

  getUser() {
    return this.user;
  }

  saveUserInStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  loadUserFromStorage() {
    const storageUser = localStorage.getItem('user');
    if (storageUser) {
      this.user = JSON.parse(storageUser);
      this.login(this.user.name);
    }
  }
}
