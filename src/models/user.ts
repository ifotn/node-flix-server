import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// create schema w/o interface due to passport's ts limitations
// password not set as required as passport makes us first create user, then add hashed pass after
const userSchema = new mongoose.Schema({
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
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema) as any;
export default User;