"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// jwt functions
const generateToken = (user) => {
    // create token contents
    const jwtPayload = {
        id: user._id,
        username: user.username
    };
    const jwtOptions = { expiresIn: '1hr' };
    // make & return new jwt with user data, encrypted by secret, expiring in 1 hour
    return jsonwebtoken_1.default.sign(jwtPayload, process.env.PASSPORT_SECRET, jwtOptions);
};
const setTokenCookie = (res, token) => {
    // create http only cookie that client script can't read containing jwt
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
};
const clearTokenCookie = (res) => {
    // delete cookie holding current jwt
    res.clearCookie('authToken');
};
const register = async (req, res) => {
    try {
        // duplicate username check
        const duplicateUser = await user_1.default.findOne({ username: req.body.username });
        if (duplicateUser)
            throw new Error('Username already exists');
        // manual password length check. passport ignores model validation
        if (req.body.password.length < 8)
            throw new Error('Password must have min 8 characters');
        // create new user object, first from username
        const user = new user_1.default({ username: req.body.username });
        // then hash password
        await user.setPassword(req.body.password);
        // save to db
        await user.save();
        return res.status(201).json({ id: user._id });
    }
    catch (error) {
        return res.status(400).json(error.message);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        // passport checks username 1st, then hashed password 2nd if username found
        const user = await user_1.default.findOne({ username: req.body.username });
        if (!user)
            throw new Error('Invalid Login');
        // username found, hash & check password
        const result = await user.authenticate(req.body.password);
        if (!result.user)
            throw new Error('Invalid Login');
        // user found => create jwt w/user info, put jwt in httpOnly cookie, return ok
        const authToken = generateToken(result.user);
        setTokenCookie(res, authToken);
        return res.status(200).json({ id: result.user._id, username: result.user.username });
    }
    catch (error) {
        return res.status(401).json(error.message); // 401: Unauthorized
    }
};
exports.login = login;
const logout = (req, res) => {
    // remove cookie w/jwt
    clearTokenCookie(res);
    res.status(200).json({ message: 'User Logged Out' });
};
exports.logout = logout;
