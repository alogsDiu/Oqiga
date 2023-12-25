"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_1 = require("../../domains/middleweres/auth");
const express_1 = require("express");
const auth_2 = require("../../domains/auth");
class AuthController {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/auth/login", auth_1.AuthMiddleware.verifyLoginData, this.login);
        this.router.post("/auth/signup", auth_1.AuthMiddleware.verifySignupData, this.registration);
    }
    async login(req, res) {
        const result = await auth_2.Auth.login(req.body);
        res.status(200).send(result);
    }
    async registration(req, res) {
        const result = await auth_2.Auth.signup(req.body);
        res.status(200).send(result);
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=index.js.map