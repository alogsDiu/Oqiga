"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventData = exports.EventModel = void 0;
const mongoose_1 = require("mongoose");
const COLLECTION_NAME = "EventData";
const EventScheme = new mongoose_1.Schema({
    location: String,
    name: String,
    description: String,
    createdBy: String,
    picture: String, // Add the picture field
}, {
    collection: COLLECTION_NAME,
});
exports.EventModel = (0, mongoose_1.model)(COLLECTION_NAME, EventScheme);
class EventData {
    static async getEventById(eventId) {
        try {
            const event = await exports.EventModel.findById(eventId);
            return event;
        }
        catch (error) {
            console.error("Error fetching event by ID:", error);
            return null;
        }
    }
    static async getAllEvents() {
        try {
            const allEvents = await exports.EventModel.find();
            return allEvents;
        }
        catch (error) {
            console.error("Error fetching all events:", error);
            return null;
        }
    }
    static async createEvent(eventData // Exclude "_id" to prevent TypeScript error
    ) {
        try {
            const newEvent = await exports.EventModel.create(eventData);
            return newEvent;
        }
        catch (error) {
            console.error("Error creating event:", error);
            return null;
        }
    }
}
exports.EventData = EventData;
//# sourceMappingURL=events.js.map