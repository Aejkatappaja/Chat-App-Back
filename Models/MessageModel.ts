import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type MessageSchemaType = {
  chatId: string;
  senderId: string;
  text: string;
};

const MessageSchema: Schema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message: Model<MessageSchemaType> = mongoose.model<MessageSchemaType>(
  "Message",
  MessageSchema
);

export default Message;
