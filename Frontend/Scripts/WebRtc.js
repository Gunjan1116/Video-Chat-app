import * as event from "./event.js";
import * as change from "./change.js";

// <---------- Sending offer to the other user ------------>

let connectedUserDetails;
export const preOffers=(connection_type,personal_code)=>{
    console.log(connection_type,personal_code)
    let data={
        connection_type,
        personal_code
    }
    event.preOffers(data)
}
export const RecivingPreOffer=(data)=>{
    console.log("WebRtc got pre offer")
    console.log(data);
    const {connection_type,personal_code}=data
    connectedUserDetails={
        socketId:personal_code,
        connection_type
    }
    if(connection_type=="personal_code_chat"||connection_type=="personal_code_video"){
        change.showIncomingPopUp(connection_type,acceptCall,rejectCall)
    }
}
const acceptCall=()=>{
    console.log("call accepted")
}
const rejectCall=()=>{
    console.log("call rejected")
}