import * as state from "./state.js"
import * as change from "./change.js"
import * as WebRtc from "./WebRtc.js"
import * as constants from "./constants.js"
let socketIo;
export const registerSocketEvent=(socket)=>{
    socket.on("connect",()=>{
        socketIo=socket
        console.log("successfully connected to wss server");
        //console.log(socket.id)
        state.setSocketId(socket.id)
        change.updatePersonalCode(socket.id)
    })
    socket.on("preOffers",(data)=>{
        console.log("getting pre offers");
        WebRtc.RecivingPreOffer(data)
    })
    socket.on("pre_offer_answer",(data)=>{
        WebRtc.handlePreOfferAnswer(data)
    })
    

    //hangup listening to the event
    socket.on("user_hanged_up",()=>{
        WebRtc.handleConnectedUserHangedUp()
    })

    socket.on("webRTC_signaling",(data)=>{
            console.log(data);
            switch (data.type){
                case constants.webRTCSingnaling.OFFER:
                    WebRtc.handleWebRTCOffer(data);
                    break;
                case constants.webRTCSingnaling.ANSWER:
                    WebRtc.handleWebRTCAnswer(data);
                    break;
                case constants.webRTCSingnaling.ICE_CANDIDATE:
                    WebRtc.handleWebRTCCandidate(data);
                    break;
                    default:
                        return;
            }
    })
}
export const preOffers=(data)=>{
    console.log("sending pre offers")
    socketIo.emit("preOffer",data)
}
export const sendPreOfferAnswer=(data)=>{
    socketIo.emit("pre_offer_answer",data)
}


export const sendDataUsingWebRTCSignaling=(data)=>{
    socketIo.emit("webRTC_signaling",data)
}

export const sendUserHangdUp=(data)=>{
    socketIo.emit("user_hanged_up",data)
}