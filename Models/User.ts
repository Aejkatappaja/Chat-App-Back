import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  token: string;
  hash: string;
  salt: string;
}
const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  token: String,
  hash: String,
  salt: String,
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
