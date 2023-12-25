import { Document, Schema, model, Model, Types } from "mongoose";

const COLLECTION_NAME = "EventData";


export interface IEvent extends Document {
  accessToken: string;
  location: string;
  name: string;
  createdBy: string;
  description: string;
  picture: string; 
}

const EventScheme = new Schema<IEvent>(
  {
    location: String,
    name: String,
    description: String,
    createdBy: String, // Reference to User model
    picture: String, // Add the picture field
  },
  {
    collection: COLLECTION_NAME,
  }
);

export const EventModel: Model<IEvent> = model<IEvent>(
  COLLECTION_NAME,
  EventScheme
);

export class EventData {
  public static async getEventById(
    eventId: Types.ObjectId
  ): Promise<IEvent | null> {
    try {
      const event = await EventModel.findById(eventId);
      return event;
    } catch (error) {
      console.error("Error fetching event by ID:", error);
      return null;
    }
  }

  public static async getAllEvents(): Promise<IEvent[] | null> {
    try {
      const allEvents = await EventModel.find();
      return allEvents;
    } catch (error) {
      console.error("Error fetching all events:", error);
      return null;
    }
  }

  public static async createEvent(
    eventData: Omit<IEvent, "_id"> // Exclude "_id" to prevent TypeScript error
  ): Promise<IEvent | null> {
    try {
      const newEvent = await EventModel.create(eventData);
      return newEvent;
    } catch (error) {
      console.error("Error creating event:", error);
      return null;
    }
  }
}
