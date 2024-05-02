import { Schema,model } from "mongoose";

const nameCollection = 'Cart'

const CartShema = new Schema ({
    products:[

       { 
        _id:false,

        id:{
            type:Schema.Types.ObjectId,
            ref:'Producto'
        },
        quantity:{
            type:Number,
            required:[true,'La cantidad del producto es obligatorio']
        }

       }
    ]
});

export const cartModel = model(nameCollection, CartShema);