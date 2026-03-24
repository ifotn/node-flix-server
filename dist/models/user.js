"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
// create schema w/o interface due to passport's ts limitations
// password not set as required as passport makes us first create user, then add hashed pass after
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minLength: 6
    },
    password: {
        type: String,
        trim: true,
        minLength: 8
    }
});
// have this schema extend or "plugin" passportLocalMongoose => tell passport this model handles auth
userSchema.plugin(passport_local_mongoose_1.default);
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
