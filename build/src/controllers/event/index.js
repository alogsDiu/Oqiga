"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const express_1 = require("express");
const events_1 = require("../../domains/events");
class EventController {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/get-events", this.getEvents);
        this.router.post("/sent-events", this.createEvent);
        this.router.post("/delete-event", this.deleteEvent);
    }
    async deleteEvent(req, res) {
        const result = await events_1.EventService.deleteEvent(req.body);
        res.status(200).send(result);
    }
    async getEvents(req, res) {
        const result = await events_1.EventService.getEvents(req.body.accessToken);
        res.status(200).send(result);
    }
    async createEvent(req, res) {
        const result = await events_1.EventService.createEvent(req.body, req.body.picture);
        res.status(200).send(result);
    }
}
exports.EventController = EventController;
//# sourceMappingURL=index.js.map