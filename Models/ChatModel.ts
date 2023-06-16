import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type ChatSchemaType = {
  members: [string];
};

const ChatSchema: Schema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Chat: Model<ChatSchemaType> = mongoose.model<ChatSchemaType>(
  "Chat",
  ChatSchema
);

export default Chat;
