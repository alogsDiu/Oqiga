"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const express_1 = require("express");
const message_1 = require("../../domains/message");
class ChatController {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/sent-message", this.sentMessage);
        this.router.post("/get-message", this.getMessage);
    }
    async sentMessage(req, res) {
        const result = await message_1.Message.messageSent(req.body);
        res.status(200).send(result);
    }
    async getMessage(req, res) {
        const result = await message_1.Message.messagesGet(req.body);
        res.status(200).send(result);
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=index.js.map