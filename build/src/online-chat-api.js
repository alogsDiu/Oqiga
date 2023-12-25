"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./controllers/auth");
const chat_1 = require("./controllers/chat");
const init_db_1 = require("./db/init-db");
const config_1 = require("./domains/config");
const server_1 = require("./domains/server");
const event_1 = require("./controllers/event");
const app = new server_1.ServerApp([new auth_1.AuthController(), new chat_1.ChatController(), new event_1.EventController()], config_1.Config.clientApiPort);
const init = async () => {
    app.init();
};
(0, init_db_1.initDatabase)().then(init);
//# sourceMappingURL=online-chat-api.js.map