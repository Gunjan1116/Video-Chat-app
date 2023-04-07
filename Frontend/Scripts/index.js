import * as state from "./state.js";
import * as event from "./event.js";
import * as WebRtc from "./WebRtc.js";
import * as change from "./change.js"
const socket = io("https://cwbackendft-production-14f9.up.railway.app/", { transports: ["websocket"] });
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

//event listener for video call buttons
const micButton=document.getElementById("mic_button")
micButton.addEventListener("click",()=>{
  const localStream=state.getState().localStream;
  const micEnabled=localStream.getAudioTracks()[0].enabled;
  localStream.getAudioTracks()[0].enabled=!micEnabled;
  change.updateMicButton(micEnabled)
})

const cameraButton=document.getElementById("camera_button")
cameraButton.addEventListener("click",()=>{
  const localStream=state.getState().localStream;
  const cameraEnabled=localStream.getVideoTracks()[0].enabled;
  localStream.getVideoTracks()[0].enabled=!cameraEnabled;
  change.updateCameraButton(cameraEnabled)
})

const switchForScreenSharingButton=document.getElementById("screen_sharing_button");
switchForScreenSharingButton.addEventListener("click",()=>{
  const screenSharingActive=state.getState().screenSharingActive;
  WebRtc.switchBetweenCameraAndScreenSharing(screenSharingActive)
})


//hangup

const hangUpButton=document.getElementById("hang_up_button");
hangUpButton.addEventListener("click",()=>{
  WebRtc.handleHangUp();
})

const hangUpChatButton=document.getElementById("finish_chat_call_button");
hangUpChatButton.addEventListener("click",()=>{
  WebRtc.handleHangUp()
})

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
// });

const newMessageInput= document.getElementById('new_message_input');
let message_container = document.querySelector(".message_container");
newMessageInput.addEventListener('keydown',(event)=>{
  console.log("change occured");
  const key = event.key;
  if(key ==='Enter'){
    WebRtc.sendMessageUsingDataChannel(event.target.value);
    change.appendMessage(event.target.value, true);
    newMessageInput.value="";
    message_container.scrollTop = message_container.scrollHeight - message_container.clientHeight;
  }
})
const sendMessageButton= document.getElementById('send_message_button');
  sendMessageButton.addEventListener('click',()=>{
    const message= newMessageInput.value;
    WebRtc.sendMessageUsingDataChannel(message);
    change.appendMessage(message, true)
    newMessageInput.value="";
  });
