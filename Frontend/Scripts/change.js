import * as element from "./element.js"

// ============ Updating in Input Field ============

export const updatePersonalCode=(code)=>{
    const personal_code_paragraph=document.getElementById("personal_code_paragraph");
    personal_code_paragraph.innerHTML=code
}

//  ============  Update Code in UI ============

export const showIncomingPopUp=(connection_type,acceptCall,rejectCall)=>{
    let callType;
    if(connection_type=="personal_code_chat"){
        callType="Chat"
    }else if(connection_type=="personal_code_video"){
        callType="Video"
    }
    const incomingCallDialog = element.getIncomingCallBox();
}