import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js"
import hotelsRouter from "./routes/hotels.js"
import usersRouter from "./routes/users.js"
import roomsRouter from "./routes/rooms.js"
import cookieParser from "cookie-parser";
const app = express()
dotenv.config()

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    }catch(error){
        throw error;
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("Disconnected");
})

//middlewares
app.use(cookieParser())
app.use(express.json()) //by default we cannot send json object to express server so to prevent that we use this
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);

app.use((err,req,res,next) =>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8800, ()=>{
    connect()
    console.log("connected to back")
});