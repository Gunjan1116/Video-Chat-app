import * as state from "./state.js";
import * as event from "./event.js";
import * as WebRtc from "./WebRtc.js";
const socket = io("http://localhost:5000/", { transports: ["websocket"] });
//registering event for socketId
event.registerSocketEvent(socket);

WebRtc.getLocalPreview();

//personal code copy button
const personal_code_copy_button = document.querySelector(
  "#personal_code_copy_button"
);
personal_code_copy_button.addEventListener("click", () => {
  const personal_code = state.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(personal_code);
});
//event for connecting buttons using personal code
const chat_button = document.querySelector("#personal_code_chat_button");
chat_button.addEventListener("click", () => {
  console.log("chat");
  const client2_code = document.querySelector("#personal_code_input").value;
  WebRtc.preOffers("personal_code_chat", client2_code);
});
const video_button = document.querySelector("#personal_code_video_button");
video_button.addEventListener("click", () => {
  console.log("video");
  const client2_code = document.querySelector("#personal_code_input").value;
  WebRtc.preOffers("personal_code_video", client2_code);
});
// const input_msg = document.querySelector("form");
// const container = document.getElementById("top")
// const append =(message,position)=>{
//     const userDiv = document.createElement("p");
//     userDiv.innerText = message;
//     userDiv.classList.add("message");
//     userDiv.classList.add(position)
//     container.append(userDiv)
// }
// input_msg.addEventListener("submit", (e) => {
//     e.preventDefault();
//     var message = document.querySelector("#message").value;
//     console.log(message)
//     // const p = document.createElement("p");
//     // p.innerText = message;
//     append(`You : ${message}`,"right")
//     socket.emit("User_Send",message);
//     message ="";
// })
// socket.on("welcome",(msg)=>{
//     append()
//     console.log(msg);
// });
// socket.on("server_send",(msg)=>{
//     console.log(msg);
//     append(msg,"left")
// })
