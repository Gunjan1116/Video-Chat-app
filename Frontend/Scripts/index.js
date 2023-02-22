const socket=io("http://localhost:5000/",{transports:["websocket"]});

const input_msg = document.querySelector("form");
const container = document.getElementById("top")

const append =(message,position)=>{

    const userDiv = document.createElement("p");

    userDiv.innerText = message;
    userDiv.classList.add("message");
    userDiv.classList.add(position)

    container.append(userDiv)
}


input_msg.addEventListener("submit", (e) => {
    e.preventDefault();
    var message = document.querySelector("#message").value;
    console.log(message)
    // const p = document.createElement("p");
    // p.innerText = message;
    append(`You : ${message}`,"right")
    socket.emit("User_Send",message);
    message ="";
})


socket.on("welcome",(msg)=>{
    append()
    console.log(msg);
});

socket.on("server_send",(msg)=>{
    console.log(msg);
    append(msg,"left")
})

