import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: {type: String, required: true, unique: true},
});

export const User = mongoose.model('accounts', UserSchema);

export const createUser = (values: Record<string, any>) => new User(values)
    .save().then((user) => user.toObject());