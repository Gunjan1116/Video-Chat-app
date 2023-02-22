const express=require("express");
const {Server}=require("socket.io");
const http=require("http");
const {connection}=require("./Config/db")
require("dotenv").config();

const app=express()
const httpServer=http.createServer(app);

app.get("/",(req,res)=>{
    res.send("Hello!!")
})

const io=new Server(httpServer);

io.on("connection",(socket)=>{
    console.log("new client connected!!");

    socket.emit("welcome","welcome to live video chat app!!")

    socket.on("disconnect",()=>{
        console.log("user disconnected!!")
    })
})

httpServer.listen(process.env.port,async()=>{

    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log("Not able to connected to DB")
    }
    console.log(`Server is running at port ${process.env.port}`)
})