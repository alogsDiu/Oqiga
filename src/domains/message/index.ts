import { verify, JwtPayload } from "jsonwebtoken";
import { Imessage, UserMessageModel } from "../../data/message";
import { UserModel } from "../../data/user";
import { Config } from "../config";
import { UnauthorizedException } from "../exception";

export type MessagesResultType = {
  messages: Imessage[]; // Assuming Imessage is an array type
};

export type MessagesType = {
  accesstoken: string;
  message: string;
};

export type tokenType = {
  accessToken: string;
};

export class Message {
  public static async messagesGet(
    data: tokenType
  ): Promise<MessagesResultType> {
    try {
      const decoded = verify(
        data.accessToken,
        Config.clientAuthSecretOrPrivateKey
      ) as JwtPayload;

      if (!decoded.id) {
        throw new Error("Invalid token payload");
      }

      const user = await UserModel.findById(decoded.id);

      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      const messages = await UserMessageModel.find({});

      return { messages };
    } catch (error) {
      console.error("Error retrieving messages:", error);
      throw new Error("Failed to retrieve messages");
    }
  }

  public static async messageSent(data: MessagesType): Promise<void> {
    try {
      const decoded = verify(
        data.accesstoken,
        Config.clientAuthSecretOrPrivateKey
      ) as JwtPayload;

      if (!decoded.id) {
        throw new Error("Invalid token payload");
      }

      const user = await UserModel.findById(decoded.id);

      if (!user) {
        throw new UnauthorizedException("User not found");
      }

      const newMessageSent = new UserMessageModel({
        userName: user.userName,
        message: data.message,
        token: data.accesstoken,
      });

      await newMessageSent.save();
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }
}
