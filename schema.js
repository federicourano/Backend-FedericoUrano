import { Schema, Types, model } from "mongoose";

const UserSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    age: {type: Number, required: true},
});

export const UserModel = model("users", UserSchema);