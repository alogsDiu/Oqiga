import { Document, Schema, model, Model } from "mongoose";

const COLLECTION_NAME = "UserMessages";

export interface Imessage extends Document {
  message: string;
  userName: string;
  token: string;
}

const UserMessageScheme = new Schema<Imessage>(
  {
    message: String,
    userName: String,
    token: String,
  },
  {
    collection: COLLECTION_NAME,
  }
);

export const UserMessageModel: Model<Imessage> = model<Imessage>(
  COLLECTION_NAME,
  UserMessageScheme
);

