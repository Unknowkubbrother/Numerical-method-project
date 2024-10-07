"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const users_1 = require("../models/users");
const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.sendStatus(400);
        }
        const user = await (0, users_1.createUser)({
            username,
            password
        });
        return res.status(201).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.register = register;
//# sourceMappingURL=authentication.js.map