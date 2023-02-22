const socket=io("http://localhost:5000/",{transports:["websocket"]});

const input_msg = document.querySelector("form");

input_msg.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = document.querySelector("#message").value;
    const p = document.createElement("p");
    p.innerText = message;
})


socket.on("welcome",(msg)=>{
    console.log(msg);
});

