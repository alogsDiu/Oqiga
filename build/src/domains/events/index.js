"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const events_1 = require("../../data/events");
const config_1 = require("../config");
const user_1 = require("../../data/user");
class EventService {
    static async getEvents(accessToken) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(accessToken, config_1.Config.clientAuthSecretOrPrivateKey);
            if (!decoded.id) {
                throw new Error("Invalid token payload");
            }
            const allEvents = await events_1.EventData.getAllEvents();
            if (allEvents !== null) {
                return { events: allEvents };
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error("Error fetching all events:", error);
            return null;
        }
    }
    static async deleteEvent(event) {
        const decoded = (0, jsonwebtoken_1.verify)(event.accessToken, config_1.Config.clientAuthSecretOrPrivateKey);
        if (!decoded.id) {
            throw new Error("Invalid token payload");
        }
        const user = await user_1.UserModel.findById(decoded.id);
        if (!user) {
            throw new Error("User doesn't exist");
        }
        const email = user.email;
        await events_1.EventModel.deleteOne({
            name: event.name,
            createdBy: email,
        });
    }
    static async createEvent(event, picture) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(event.accessToken, config_1.Config.clientAuthSecretOrPrivateKey);
            if (!decoded.id) {
                throw new Error("Invalid token payload");
            }
            const user = await user_1.UserModel.findById(decoded.id);
            if (!user) {
                throw new Error("User doesn't exist");
            }
            const email = user.email;
            const newEvent = await events_1.EventModel.create({
                ...event,
                createdBy: user.userName,
                picture: picture,
            });
            return newEvent;
        }
        catch (error) {
            console.error("Error creating event:", error);
            return null;
        }
    }
}
exports.EventService = EventService;
//# sourceMappingURL=index.js.map