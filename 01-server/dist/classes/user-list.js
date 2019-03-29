"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserList {
    constructor() {
        this.list = [];
    }
    add(user) {
        this.list.push(user);
        return user;
    }
    updateName(id, name) {
        for (const user of this.list) {
            if (user.id === id) {
                user.name = name;
            }
        }
    }
    getList() {
        return this.list;
    }
    getUser(id) {
        return this.list.find((user) => user.id === id);
    }
    getUserForRoom(room) {
        return this.list.filter((user) => user.room === room);
    }
    deleteUser(id) {
        const userToDelete = this.getUser(id);
        if (userToDelete) {
            this.list = this.list.filter((user) => user.id !== userToDelete.id);
        }
        return this.list;
    }
}
exports.UserList = UserList;
