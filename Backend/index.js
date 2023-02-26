// External And Internal Modules

const express=require("express");
const cors=require("cors");
const http=require("http");
const {Server}=require("socket.io");
const app = express();
app.use(cors())
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


let allConnectedUsers=[];

io.on("connection",(socket)=>{
    console.log("New Client Connected !!");
    allConnectedUsers.push(socket.id)


    socket.on("preOffer",(data)=>{
        console.log(data)
        const {connection_type,personal_code}=data;

        const reqUser=allConnectedUsers.find((socketId)=>{//reqUser is the user which send his code to client 2 to connect
           return socketId==personal_code;
        })
        if(reqUser){
            const data={
                connection_type,
                personal_code:socket.id//id of client 2
            }
            io.to(personal_code).emit("preOffers",data)//emit the event to the reqUser
        }else{
            const data={
                preOfferAnswer:"Not_Found"
            }
            io.to(socket.id).emit("pre_offer_answer",data)
        }
    })

    socket.on("pre_offer_answer",(data)=>{
        console.log("pre offer answer came")
        console.log(data)

        const reqUser=allConnectedUsers.find((socketId)=>{//reqUser is the user which send his code to client 2 to connect
            return socketId==data.callerSocketId;
         })
         if(reqUser){
             io.to(data.callerSocketId).emit("pre_offer_answer",data)//emit the event to the reqUser
         }

    })

    socket.on("webRTC_signaling",(data)=>{

        const {connectedUserSocketId}=data

        const reqUser=allConnectedUsers.find((socketId)=>{//reqUser is the user which send his code to client 2 to connect
            return socketId==connectedUserSocketId;
         })
         if(reqUser){
            io.to(connectedUserSocketId).emit("webRTC_signaling",data)
         }

    })

    socket.on("user_hanged_up",(data)=>{
        const {connectedUserSocketId}=data

        const reqUser=allConnectedUsers.find((socketId)=>{//reqUser is the user which send his code to client 2 to connect
            return socketId==connectedUserSocketId;
         })
         if(reqUser){
            io.to(connectedUserSocketId).emit("user_hanged_up")
         }

    })
    //console.log(allConnectedUsers);
    //socket.emit("Welcome","Welcome to live video chat app!!");

    // socket.on("User_Send", (msg) => {
    //     console.log(msg)
    //     socket.broadcast.emit("server_send", msg)
    // })

    socket.on("disconnect",()=>{
        console.log("User Disconnected !!");
        userAvaliable=allConnectedUsers.filter((disconnectedSocketId)=>{
            return disconnectedSocketId!==socket.id;
        })
        allConnectedUsers=userAvaliable;
        //console.log(allConnectedUsers)
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