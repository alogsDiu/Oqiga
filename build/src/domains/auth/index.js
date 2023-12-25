"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const user_1 = require("../../data/user");
const exception_1 = require("../exception");
const token_1 = require("../token");
const bcryptjs_1 = require("bcryptjs");
class Auth {
    static async login(data) {
        const user = await user_1.UserData.getUserByEmail(data.email);
        if (!user) {
            throw new exception_1.BadRequestException("Неверные учетные данные");
        }
        if (!this.comparePasswords(user.password, data.password)) {
            throw new exception_1.BadRequestException("Неверные учетные данные");
        }
        const token = token_1.Token.signTokenForUser({
            id: user._id,
        }, {
            expiresIn: data.rememberMe ? "1h" : "6h",
        });
        return {
            token,
            user: user.userName,
        };
    }
    static async signup(data) {
        const userByEmail = await user_1.UserData.getUserByEmail(data.email);
        if (userByEmail) {
            throw new exception_1.BadRequestException("Пользователь с таким email уже существует");
        }
        const hashPassword = this.hashPassword(data.password);
        const newUser = new user_1.UserModel({
            email: data.email,
            password: hashPassword,
            userName: data.userName
        });
        await newUser.save();
        const token = token_1.Token.signTokenForUser({
            id: newUser._id,
        }, {
            expiresIn: "1h",
        });
        return {
            token,
            user: newUser.userName,
        };
    }
    static comparePasswords(hashPassword, password) {
        return (0, bcryptjs_1.compareSync)(password, hashPassword);
    }
    static hashPassword(password) {
        const salt = (0, bcryptjs_1.genSaltSync)(10);
        return (0, bcryptjs_1.hashSync)(password, salt);
    }
}
exports.Auth = Auth;
//# sourceMappingURL=index.js.map