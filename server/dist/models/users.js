"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
});
exports.User = mongoose_1.default.model('accounts', UserSchema);
const createUser = (values) => new exports.User(values)
    .save().then((user) => user.toObject());
exports.createUser = createUser;
//# sourceMappingURL=users.js.map