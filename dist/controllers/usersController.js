"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const register = async (req, res) => {
    // create new user object, first from username
    const user = new user_1.default({ username: req.body.username });
    // then hash password
    await user.setPassword(req.body.password);
    // save to db
    await user.save();
    return res.status(201).json(user);
};
exports.register = register;
