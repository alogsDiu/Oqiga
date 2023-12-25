"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMessageModel = void 0;
const mongoose_1 = require("mongoose");
const COLLECTION_NAME = "UserMessages";
const UserMessageScheme = new mongoose_1.Schema({
    message: String,
    userName: String,
    token: String,
}, {
    collection: COLLECTION_NAME,
});
exports.UserMessageModel = (0, mongoose_1.model)(COLLECTION_NAME, UserMessageScheme);
//# sourceMappingURL=message.js.map