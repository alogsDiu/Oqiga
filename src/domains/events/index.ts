import { JwtPayload, verify } from "jsonwebtoken";
import { EventModel, IEvent, EventData } from "../../data/events";
import { Config } from "../config";
import { tokenType } from "../message";
import { UserModel } from "../../data/user";

export type EventsResult = {
  events: IEvent[];
};

export class EventService {
  public static async getEvents(
    accessToken: string
  ): Promise<EventsResult | null> {
    try {
      const decoded = verify(
        accessToken,
        Config.clientAuthSecretOrPrivateKey
      ) as JwtPayload;

      if (!decoded.id) {
        throw new Error("Invalid token payload");
      }

      const allEvents = await EventData.getAllEvents();
      if (allEvents !== null) {
        return { events: allEvents };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching all events:", error);
      return null;
    }
  }

  public static async deleteEvent(event: IEvent) {
    const decoded = verify(
      event.accessToken,
      Config.clientAuthSecretOrPrivateKey
    ) as JwtPayload;

    if (!decoded.id) {
      throw new Error("Invalid token payload");
    }

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      throw new Error("User doesn't exist");
    }

    const email = user.email;

    await EventModel.deleteOne({
      name: event.name,
      createdBy: email,
    });
  }

  public static async createEvent(
    event: IEvent,
    picture: string
  ): Promise<IEvent | null> {
    try {
      const decoded = verify(
        event.accessToken,
        Config.clientAuthSecretOrPrivateKey
      ) as JwtPayload;

      if (!decoded.id) {
        throw new Error("Invalid token payload");
      }

      const user = await UserModel.findById(decoded.id);

      if (!user) {
        throw new Error("User doesn't exist");
      }

      const newEvent = await EventModel.create({
        ...event,
        createdBy: user.userName,
        picture: picture,
      });

      return newEvent;
    } catch (error) {
      console.error("Error creating event:", error);
      return null;
    }
  }
}
