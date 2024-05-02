import { Schema,model } from "mongoose";

const nameCollection = 'Producto'

const ProductShema = new Schema ({
    title : {type:String, required:[true,'el title del producto es obligatorio']},
    description: {type:String, required:[true,'la description del producto es obligatorio']},
    price : {type: Number, required: [true, 'El price del producto es obligatorio']},
    thumbails: [{type: String}],
    code : {type: String, required: [true, 'El code del producto es obligatorio'],unique: true},
    stock : {type: Number, required:[true, 'El stock del producto es obligatorio']},
    category : {type: String, required: [true, 'El category del producto es obligatorio']},
    status : {type:Boolean, default: true}
});

export const productModel = model(nameCollection, ProductShema);