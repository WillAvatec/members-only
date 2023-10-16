import mongoose, { Schema, Types } from "mongoose";

interface IMessage {
  content: string;
  createdBy: Types.ObjectId;
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    content: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
