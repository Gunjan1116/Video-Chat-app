import * as events from "./event.js";
import * as change from "./change.js";
import * as state from "./state.js";
import * as constants from "./constants.js"
// <---------- Sending offer to the other user ------------>

let connectedUserDetails;
let peerConnection;
let dataChannel;
const defaultConstraints = {
    audio: true,
    video: true
}
const configuration = {
    iceServers: [
        {
            urls: "stun:stun.1.google.com:13902"
        }
    ]
}
export const getLocalPreview = () => {
    navigator.mediaDevices.getUserMedia(defaultConstraints)
        .then((stream) => {
            change.updateLocalVideo(stream);
            state.setLocalStream(stream);
        }).catch((err) => {
            console.log("error occured when trying to access camera", err)
        })
}
const createPeerConnection = () => {
    peerConnection = new RTCPeerConnection(configuration);
    dataChannel = peerConnection.createDataChannel("chat");

    peerConnection.ondatachannel = (event) => {
        const dataChannel = event.channel;

        dataChannel.onopen = () => {
            console.log("data channel opened for messages")

        }
        dataChannel.onmessage=(event)=>{
            console.log('message came from data channel');
            const message = JSON.parse(event.data);
            change.appendMessage(message);
        }
    }
    console.log(peerConnection);
    peerConnection.onicecandidate = (event) => {
        console.log("geeting ice candidates from stun server")
        if (event.candidate) {
            //sending our ice candiadate to other peer
            events.sendDataUsingWebRTCSignaling({
                connectedUserSocketId: connectedUserDetails.socketId,
                type: constants.webRTCSingnaling.ICE_CANDIDATE,
                candidate: event.candidate
            })
        }
    }
    peerConnection.onconnectionstatechange = (event) => {
        if (peerConnection.connectionState === "connected") {
            console.log("successfully connected to other peer")
        }
    }
    //receiving track
    const remoteStream = new MediaStream();
    state.setRemoteStream(remoteStream);
    change.updateRemoteVideo(remoteStream);
    peerConnection.ontrack = (event) => {
        remoteStream.addTrack(event.track);
    }
    //add our stream to peer connection
    if (connectedUserDetails.connection_type === "personal_code_video") {
        const localStream = state.getState().localStream;
        for (const track of localStream.getTracks()) {
            peerConnection.addTrack(track, localStream)
        }
    }
}

export const sendMessageUsingDataChannel = (message) => {
    const stringifiedMessage = JSON.stringify(message);
    dataChannel.send(stringifiedMessage);
}

export const preOffers = (connection_type, personal_code) => {
    console.log(connection_type, personal_code)
    connectedUserDetails = {
        connection_type,
        socketId: personal_code
    }
    if (connection_type == "personal_code_chat" || connection_type == "personal_code_video") {
        let data = {
            connection_type,
            personal_code
        }
        change.showCallingPopUp(callingDialogRejectCallHandler)
        events.preOffers(data)
    }
}
export const RecivingPreOffer = (data) => {
    console.log("WebRtc got pre offer")
    console.log(data);
    const { connection_type, personal_code } = data
    connectedUserDetails = {
        socketId: personal_code,
        connection_type
    }
    if (connection_type == "personal_code_chat" || connection_type == "personal_code_video") {
        change.showIncomingPopUp(connection_type, acceptCall, rejectCall)
    }
}
const acceptCall = () => {

    console.log("call accepted")
    createPeerConnection()
    sendPreOfferAnswer("Call_Accepted");
    change.showCallElements(connectedUserDetails.connection_type)

}
const rejectCall = () => {
    console.log("call rejected")
    sendPreOfferAnswer("Call_Rejected");
}
const callingDialogRejectCallHandler = () => {
    console.log("Rejecting call!!")
}
const sendPreOfferAnswer = (preOfferAnswer) => {
    const data = {
        callerSocketId: connectedUserDetails.socketId,
        preOfferAnswer
    }
    change.removeAllDialogs();
    events.sendPreOfferAnswer(data);
}

export const handlePreOfferAnswer = (data) => {
    const { preOfferAnswer } = data;
    console.log("pre offer answers came")
    console.log(data);
    change.removeAllDialogs();
    if (preOfferAnswer === "Not_Found") {
        change.showInfoDialog(preOfferAnswer)
        //if not found
    }
    if (preOfferAnswer === "Call_Unavailable") {
        change.showInfoDialog(preOfferAnswer)
    }
    if (preOfferAnswer === "Call_Rejected") {
        change.showInfoDialog(preOfferAnswer)
    }
    if (preOfferAnswer === "Call_Accepted") {
        //send webrtc offer
        change.showCallElements(connectedUserDetails.connection_type)
        createPeerConnection();
        sendWebRTCOffer();
    }
}

const sendWebRTCOffer = async () => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer)
    events.sendDataUsingWebRTCSignaling({
        connectedUserSocketId: connectedUserDetails.socketId,
        type: constants.webRTCSingnaling.OFFER,
        offer: offer
    })
}

export const handleWebRTCOffer = async (data) => {
    console.log("webRTC offer came");
    console.log(data);
    await peerConnection.setRemoteDescription(data.offer)

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer)
    events.sendDataUsingWebRTCSignaling({
        connectedUserSocketId: connectedUserDetails.socketId,
        type: constants.webRTCSingnaling.ANSWER,
        answer: answer
    })
}

export const handleWebRTCAnswer = async (data) => {
    console.log("handeling webRTC Answer")
    console.log(data);
    await peerConnection.setRemoteDescription(data.answer)
}

export const handleWebRTCCandidate = async (data) => {
    console.log("handeling incoming webRTC candidate")
    try {
        await peerConnection.addIceCandidate(data.candidate);

    } catch (err) {
        console.log("error occured when trying to add recived ice candidate", err)
    }
}

export const switchBetweenCameraAndScreenSharing = async (screenSharingActive) => {
    if (screenSharingActive) {

    } else {
        console.log("switching for screen sharing")

        try {
            screenSharingStream = await navigator.mediaDevices.getDisplayMedia({
                video: true
            })
            state.setScreenSharingStream(screenSharingStream)

            //replacing track which sender is sending
            const senders = peerConnection.getSenders();

            const sender = sender.find((sender) => {
                return (
                    sender.track.kind === screenSharingStream.getVideoTracks()[0].kind
                )
            })

            if (sender) {
                sender.replaceTrack(screenSharingStream.getVideoTracks()[0]);
            }

            state.setScreenSharingActive(!screenSharingActive)

            change.updateLocalVideo(screenSharingStream)
        } catch (error) {
            console.log("error occured when trying to get screen sharing", error)
        }
    }
}

//hang up
export const handleHangUp = () => {
    console.log("call ended")
    const data = {
        connectedUserSocketId: connectedUserDetails.socketId,

    }
    events.sendUserHangdUp(data);
    closePeerConnectionAndResetState();
}

export const handleConnectedUserHangedUp = () => {
    console.log("connected client hanged up")
    closePeerConnectionAndResetState();
}

const closePeerConnectionAndResetState = () => {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }

    //active mic and camera
    if (connectedUserDetails.connection_type === "personal_code_video") {
        state.getState().localStream.getVideoTracks()[0].enabled = true;
        state.getState().localStream.getAudioTracks()[0].enabled = true;
    }

    change.updateUIAfterHangUp(connectedUserDetails.connection_type)
    connectedUserDetails = null
}