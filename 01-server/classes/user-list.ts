import { User } from './user';
export class UserList{
    private list: User[] = [];
    
    constructor() {
    }

    public add (user: User) {
        this.list.push(user);
        return user;
    }

    public updateName (id: string, name: string) {
        for (const user of this.list) {
            if (user.id === id) {
                user.name = name;
            }
        }
    }

    public getList () {
        return this.list;
    }

    public getUser (id: string) {
        return this.list.find((user: User) => user.id === id);
    }

    public getUserForRoom (room: string) {
        return this.list.filter((user: User) => user.room === room);
    }

    public deleteUser (id: string) {
        const userToDelete = this.getUser(id);
        if(userToDelete){
            this.list = this.list.filter((user: User) => user.id !== userToDelete.id);
        }

        return this.list;
    }
}