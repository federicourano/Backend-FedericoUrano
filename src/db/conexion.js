import mongoose from "mongoose";

const connectionString = "mongodb+srv://admin:LAtayni8kC2AW6na@urano.gu8hoe2.mongodb.net/coderhouse?retryWrites=true&w=majority&appName=Urano;"

export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log("Conectado a la base de datos de MongoDB")
    } catch (error) {
        console.log(error)
    }
}
