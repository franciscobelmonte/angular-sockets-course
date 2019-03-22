import Server from "./classes/server";

const server = new Server();

server.start(() => {
    console.log(`Server running in ${server.port}`);
})