import { Document, Schema, model, Model } from "mongoose";

const COLLECTION_NAME = "UserData";

export interface IUser extends Document {
  email: string;
  password: string;
  userName: String
}

const UserSchema = new Schema<IUser>(
  {
    email: String,
    password: String,
    userName: String
  },
  {
    collection: COLLECTION_NAME,
  }
);

export const UserModel: Model<IUser> = model<IUser>(COLLECTION_NAME, UserSchema);

export class UserData {
  public static async getUserById(userId: string | number): Promise<IUser | null> {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      return null;
    }
  }

  public static async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const user = await UserModel.findOne({ email: email });
      return user;
    } catch (error) {
      console.error("Error fetching user by email:", error);
      return null;
    }
  }
}
