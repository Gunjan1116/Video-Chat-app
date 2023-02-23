let state={
    socketId:null,
    localStream:null,
    remoteStream:null,
    screenSharingStream:null,
    allowConectionsFromOthers:false,
    screenSharingActive:false,
}

const setSocketId=(socketId)=>{
    state={
        ...state,
        socketId
    };
    console.log(state);
};

const setLocalStream=(stream)=>{
    state={
        ...state,
        localStream: stream
    };
};

const setRemoteStream=(stream)=>{
    state={
        ...state,
        remoteStream: stream
    };
};

const setScreenSharingStream=(stream)=>{
    state={
        ...state,
        screenSharingStream:stream
    };
};

const setAllowConectionsFromOthers=(allow)=>{
    state={
        ...state,
        allowConectionsFromOthers:allow
    };
};



const setScreenSharingActive=(active)=>{
    state={
        ...state,
        screenSharingActive:active
    };
};

const getState=()=>{
    return state;
}

export {setSocketId,setLocalStream,setRemoteStream,setScreenSharingStream,setAllowConectionsFromOthers,setScreenSharingActive,getState}