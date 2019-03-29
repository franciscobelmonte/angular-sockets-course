"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name = 'without-name', room = 'without-room') {
        this.id = id;
        this.name = name;
        this.room = room;
    }
}
exports.User = User;
