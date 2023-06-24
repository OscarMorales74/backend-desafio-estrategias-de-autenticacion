import { MessagesModel } from "./models/messages.model.js";

export default class MessagesDaoMDB {
    async getAllMsgs(){
        try {
            const response = await MessagesModel.find({})
            return response
        } catch (error) {
            console.log(error)
        };
    };
    async sendMsg(userName, message) {
        try {
            const newMessage = await MessagesModel.create({user: userName, msg: message})
            return newMessage
        } catch (error) {
            console.log(error)
        };
    };
    async deleteMsg(msgId) {
        try {
            const delMessage = await MessagesModel.findByIdAndDelete(msgId)
            return delMessage
        } catch (error) {
            console.log(error)
        };
    };
}