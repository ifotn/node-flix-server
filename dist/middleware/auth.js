"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// check for jwt, decrypt if found
const verifyToken = (req, res, next) => {
    try {
        // get jwt from cookie
        const authToken = req.cookies.authToken;
        // no jwt in cookie
        if (!authToken)
            throw new Error('No token');
        const decode = jsonwebtoken_1.default.verify(authToken, process.env.PASSPORT_SECRET);
        req.user = decode;
        next(); // user found, continue to next method after middleware
    }
    catch (error) {
        return res.status(401).json({ error: error.message || 'Unauthorized ' });
    }
};
exports.verifyToken = verifyToken;
