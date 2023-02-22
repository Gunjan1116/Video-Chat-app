// External And Internal Modules

const express=require("express");
const http=require("http");
const {Server}=require("socket.io");
const app = express();

// =========== Routers and Models Location =================


const {connection}=require("./Config/db");
const { UserRouter } = require("./Routes/UserRoute");



require("dotenv").config();

const httpServer=http.createServer(app);


// =========== For Testing ===========

app.get("/",(req,res)=>{
    res.send("Hello!!")
})

// =========== Middleware ===========

app.use(express.json())
app.use('/users',UserRouter)


// =========== Socket Connection ===========


const io=new Server(httpServer);




io.on("connection",(socket)=>{
    console.log("New Client Connected !!");

    socket.emit("Welcome","Welcome to live video chat app!!");

    socket.on("User_Send", (msg) => {
        console.log(msg)
        socket.broadcast.emit("server_send", msg)
    })

    socket.on("disconnect",()=>{
        console.log("User Disconnected !!")
    })
})





// =========== Listening to Server ===========

httpServer.listen(process.env.port,async()=>{

    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log("Not able to connected to DB")
    }
    console.log(`Server is running at port ${process.env.port}`)
})