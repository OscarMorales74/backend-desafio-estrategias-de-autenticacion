import mongoose from 'mongoose';

const messagesSchema = new mongoose.Schema({
    user: { type: String, required: true },
    msg: { type: String, required: true }
});

export const MessagesModel = mongoose.model(
   'messages',
   messagesSchema 
);