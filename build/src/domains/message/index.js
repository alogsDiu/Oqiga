"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const message_1 = require("../../data/message");
const user_1 = require("../../data/user");
const config_1 = require("../config");
const exception_1 = require("../exception");
class Message {
    static async messagesGet(data) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(data.accessToken, config_1.Config.clientAuthSecretOrPrivateKey);
            if (!decoded.id) {
                throw new Error("Invalid token payload");
            }
            const user = await user_1.UserModel.findById(decoded.id);
            if (!user) {
                throw new exception_1.UnauthorizedException("User not found");
            }
            const messages = await message_1.UserMessageModel.find({});
            return { messages };
        }
        catch (error) {
            console.error("Error retrieving messages:", error);
            throw new Error("Failed to retrieve messages");
        }
    }
    static async messageSent(data) {
        try {
            const decoded = (0, jsonwebtoken_1.verify)(data.accesstoken, config_1.Config.clientAuthSecretOrPrivateKey);
            if (!decoded.id) {
                throw new Error("Invalid token payload");
            }
            const user = await user_1.UserModel.findById(decoded.id);
            if (!user) {
                throw new exception_1.UnauthorizedException("User not found");
            }
            const newMessageSent = new message_1.UserMessageModel({
                userName: user.userName,
                message: data.message,
                token: data.accesstoken,
            });
            await newMessageSent.save();
        }
        catch (error) {
            console.error("Error sending message:", error);
            throw error;
        }
    }
}
exports.Message = Message;
//# sourceMappingURL=index.js.map