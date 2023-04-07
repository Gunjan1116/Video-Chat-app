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

    export const getCallingDialog=(rejectCallHandler)=>{
        const box = document.createElement("div");
        box.classList.add("dialog_wrapper")
        const boxContent = document.createElement("div");
        boxContent.classList.add("dialog_content")
        box.appendChild(boxContent)
        const title=document.createElement("p");
        title.classList.add('dialog_title');
        title.innerText=`Calling`
        const imgContainer=document.createElement('div');
        imgContainer.classList.add('box_img_container');
        const img=document.createElement("img");
        img.setAttribute("src","./utils/images/dialogAvatar.png")
        imgContainer.appendChild(img)
        const buttonContainer=document.createElement("div");
        buttonContainer.classList.add("dialog_button_container");
        const dropCallButton=document.createElement("button")
        dropCallButton.classList.add("dialog_reject_call_button");
        const dropCallImg=document.createElement("img");
        dropCallImg.classList.add("dialog_button_image");
        dropCallImg.setAttribute("src","./utils/images/rejectCall.png")
        dropCallButton.append(dropCallImg)
        buttonContainer.appendChild(dropCallButton);
        boxContent.appendChild(title)
        boxContent.appendChild(imgContainer)
        boxContent.appendChild(buttonContainer)
        return box
        }

        // dialog response
        export const getInfoDialog=(dialogTitle,description)=>{
            const box = document.createElement("div");
            box.classList.add("dialog_wrapper")
            const boxContent = document.createElement("div");
            boxContent.classList.add("dialog_content")
            box.appendChild(boxContent)
            const title=document.createElement("p");
            title.classList.add('dialog_title');
            title.innerText=dialogTitle
            const imgContainer=document.createElement('div');
            imgContainer.classList.add('box_img_container');
            const img=document.createElement("img");
            img.setAttribute("src","./utils/images/dialogAvatar.png")
            imgContainer.appendChild(img)
            const desc=document.createElement("p");
            desc.classList.add("dialog_description");
            desc.innerText=description
            boxContent.appendChild(title)
            boxContent.appendChild(imgContainer)
            boxContent.appendChild(desc)
            return box
        }

        // Display Message
        export const getLeftMessage= (message) =>{
            const messageContainer = document.createElement("div");
            messageContainer.classList.add("message_left_container");
            const messageParagraph= document.createElement("p");
            messageParagraph.classList.add("message_left_paragraph");
            messageParagraph.innerHTML=message;
            messageContainer.appendChild(messageParagraph);
            return messageContainer;
        }

        export const getRightMessage= (message) =>{
            const messageContainer = document.createElement("div");
            messageContainer.classList.add("message_right_container");
            const messageParagraph= document.createElement("p");
            messageParagraph.classList.add("message_right_paragraph");
            messageParagraph.innerHTML=message;
            messageContainer.appendChild(messageParagraph);
            return messageContainer;
        } 
