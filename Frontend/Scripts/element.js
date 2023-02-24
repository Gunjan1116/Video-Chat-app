export const getIncomingCallBox = (connection_type,acceptCall,rejectCall) =>{
    console.log("getting incoming call BOX")
    const box = document.createElement("div");
    box.classList.add("dialog_wrapper")
    const boxContent = document.createElement("div");
    boxContent.classList.add("dialog_content")
    box.appendChild(boxContent)
    const title=document.createElement("p");
    title.classList.add('dialog_title');
    title.innerText=`Incoming ${connection_type} Call`
    const imgContainer=document.createElement('div');
    imgContainer.classList.add('box_img_container');
    const img=document.createElement("img");
    img.setAttribute("src","./utils/images/dialogAvatar.png")
    imgContainer.appendChild(img)
    const buttonContainer=document.createElement("div");
    buttonContainer.classList.add("dialog_button_container");
    const acceptCallButton=document.createElement("button");
    acceptCallButton.classList.add("dialog_accept_call_button");
    const acceptCallImg=document.createElement("img");
    acceptCallImg.classList.add("dialog_button_image");
    acceptCallImg.setAttribute("src","./utils/images/acceptCall.png")
    acceptCallButton.append(acceptCallImg)
    buttonContainer.appendChild(acceptCallButton);
    const rejectCallButton=document.createElement("button");
    rejectCallButton.classList.add("dialog_reject_call_button");
    const rejectCallImg=document.createElement("img");
    rejectCallImg.classList.add("dialog_button_image");
    rejectCallImg.setAttribute("src","./utils/images/rejectCall.png")
    rejectCallButton.append(rejectCallImg)
    buttonContainer.appendChild(rejectCallButton);
    boxContent.appendChild(title)
    boxContent.appendChild(imgContainer)
    boxContent.appendChild(buttonContainer)
    acceptCallButton.addEventListener("click",()=>{
        acceptCall();
    })
    rejectCallButton.addEventListener("click",()=>{
        rejectCall();
    })
    return box
    }