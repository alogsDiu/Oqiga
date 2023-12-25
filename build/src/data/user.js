"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserData = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const COLLECTION_NAME = "UserData";
const UserSchema = new mongoose_1.Schema({
    email: String,
    password: String,
    userName: String
}, {
    collection: COLLECTION_NAME,
});
exports.UserModel = (0, mongoose_1.model)(COLLECTION_NAME, UserSchema);
class UserData {
    static async getUserById(userId) {
        try {
            const user = await exports.UserModel.findById(userId);
            return user;
        }
        catch (error) {
            console.error("Error fetching user by ID:", error);
            return null;
        }
    }
    static async getUserByEmail(email) {
        try {
            const user = await exports.UserModel.findOne({ email: email });
            return user;
        }
        catch (error) {
            console.error("Error fetching user by email:", error);
            return null;
        }
    }
}
exports.UserData = UserData;
//# sourceMappingURL=user.js.map