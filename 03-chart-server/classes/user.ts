export class User {
    constructor(
        public id: string, 
        public name: string = 'without-name',
        public room: string = 'without-room'
    ) {

    }
}