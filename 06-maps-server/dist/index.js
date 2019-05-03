"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./classes/server"));
const router_1 = __importDefault(require("./routes/router"));
const bodyParser = require("body-parser");
const cors = require("cors");
const server = server_1.default.instance;
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
server.app.use(cors({ origin: true, credentials: true }));
server.app.use('/', router_1.default);
server.start(() => {
    console.log(`Server running in ${server.port}`);
});
