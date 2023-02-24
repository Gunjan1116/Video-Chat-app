import * as state from "./state.js"
import * as change from "./change.js"
import * as WebRtc from "./WebRtc.js"
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
}
export const preOffers=(data)=>{
    console.log("sending pre offers")
    socketIo.emit("preOffer",data)
}
export const sendPreOfferAnswer=(data)=>{
    socketIo.emit("pre_offer_answer",data)
}