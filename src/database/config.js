import mongoose from "mongoose";

export const dbConnection = async() => {
    try {
        await mongoose.connect('mongodb+srv://navarronahuelezequiel:opigabUdOF6Eg4UZ@cluster0.j2bap5k.mongodb.net/ecommerce');
        console.log("Connected")
    } catch (error) {
        console.log(`Error al levantar la base de datos ${error}`)
        process.exit(1);
    }
}