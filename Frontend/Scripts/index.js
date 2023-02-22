const socket=io("http://localhost:5000/",{transports:["websocket"]})

socket.on("welcome",(msg)=>{
    console.log(msg);
})