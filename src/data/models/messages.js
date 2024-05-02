import { Schema,model } from "Message";

const nameCollection = 'Cart'

const MessageShema = new Schema ({
    user:{type: String, required:[true,'El nombre del usuario es obligatorio']},
    message:{type: String, required:[true,'El mensaje es obligatorio']}
});

export const messageModel = model(nameCollection, ProductoShema);