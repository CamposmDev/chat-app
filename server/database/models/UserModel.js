import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    friends: { type: [String] }
}, { timestamps: true })

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;