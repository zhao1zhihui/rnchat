import mongoose, { Schema, type Document } from "mongoose";
import type { IChat } from "./Chat";

export interface IMessage extends Document {
    sender: mongoose.Types.ObjectId;
    content: string;
    chat: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
const messageSchema = new Schema<IMessage>({
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
}, { timestamps: true });   
   
messageSchema.index({ chat: 1, createdAt: 1 });
 // Index for efficient retrieval of messages by chat and creation time
export const Message = mongoose.model<IMessage>("Message", messageSchema);


