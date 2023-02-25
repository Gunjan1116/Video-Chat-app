import * as element from "./element.js"

// ============ Updating in Input Field ============

export const updatePersonalCode=(code)=>{
    const personal_code_paragraph=document.getElementById("personal_code_paragraph");
    personal_code_paragraph.innerHTML=code
}

//  ============  Update Code in UI ============
export const updateLocalVideo=(stream)=>{
    const localVideo=document.getElementById("local_video");
    localVideo.srcObject=stream
    localVideo.addEventListener("loadedmetadata",()=>{
        localVideo.play();
    })
}

export const showIncomingPopUp=(connection_type,acceptCall,rejectCall)=>{
    let callType;
    if(connection_type=="personal_code_chat"){
        callType="Chat"
    }else if(connection_type=="personal_code_video"){
        callType="Video"
    }

    // =================== Incoming Call Dialog Box =================
    const incomingCallDialog = element.getIncomingCallBox(callType,acceptCall,rejectCall);

    const box=document.getElementById("dialog");
    box.querySelectorAll("*").forEach((el)=>el.remove());
    box.appendChild(incomingCallDialog);
}

// =================== Reject Call Dialog Box =================

export const showCallingPopUp=(rejectCallHandler)=>{
    const callingDialog=element.getCallingDialog(rejectCallHandler)

    const box=document.getElementById("dialog");
    box.querySelectorAll("*").forEach((el)=>el.remove());
    box.appendChild(callingDialog);
}

// =================== Changing dashboard according to response ===================

export const removeAllDialogs=()=>{
    const box=document.getElementById("dialog");
    box.querySelectorAll("*").forEach((el)=>el.remove());
}


export const showInfoDialog=(preOfferAnswer)=>{
    let infoDialog=null;
    if(preOfferAnswer==="Call_Rejected"){
        infoDialog=element.getInfoDialog(
            "Call Rejected",
            "Client Rejected the Call"
        )
    }
    if(preOfferAnswer==="Not_Found"){
        infoDialog=element.getInfoDialog(
            "Not Found",
            "Client Already Disconnected or Wrong Personal Code"
        )
    }
    if(preOfferAnswer==="Call_Unavailable"){
        infoDialog=element.getInfoDialog(
            "Unavailable",
            "Client Is Busy"
        )
    }
    if(infoDialog){
        const dialog=document.getElementById("dialog");
        dialog.appendChild(infoDialog)
        setTimeout(()=>{
            removeAllDialogs()
        },3000)
    }
}


export const showCallElements=(callType)=>{
    if(callType=="personal_code_chat"){
        showChatCallElements();
    }
    if(callType=="personal_code_video"){
        showVideoCallElements();
    }
}


const showChatCallElements=()=>{
    const finishConnectionChatButtonContainer=document.getElementById("finish_chat_button_container");
    showElement(finishConnectionChatButtonContainer);
    const newMessageInput=document.getElementById("new_message");
    showElement(newMessageInput)
    disableDashboard();
}


const showVideoCallElements=()=>{
    const callButtons=document.getElementById("call_buttons");
    showElement(callButtons);
    const palceholder=document.getElementById("video_placeholder");
    hideElement(palceholder);
    const remoteVideo=document.getElementById("remote_video");
    showElement(remoteVideo);
    const newMessageInput=document.getElementById("new_message");
    showElement(newMessageInput)
    disableDashboard();
}

// =================== Dashboard ===================

const enableDashboard=()=>{
    const dashboardBlocker=document.getElementById("dashboard_blur");
    if(!dashboardBlocker.classList.contains("display_none")){
        dashboardBlocker.classList.add("display_none");
    }
}
const disableDashboard=()=>{
    const dashboardBlocker=document.getElementById("dashboard_blur");
    if(dashboardBlocker.classList.contains("display_none")){
        dashboardBlocker.classList.remove("display_none");
    }
}
const hideElement=(el)=>{
    if(!el.classList.contains("display_none")){
        el.classList.add("display_none");
    }
}
const showElement=(el)=>{
    if(el.classList.contains("display_none")){
        el.classList.remove("display_none");
    }
}