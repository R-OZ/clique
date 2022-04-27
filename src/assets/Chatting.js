import React from 'react'
import Lottie from 'react-lottie'
import chatting from "./data/chatting.json"

const Chatting = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: chatting,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div>
        <Lottie 
          options={defaultOptions}
          height='100%'
          width='100%'
        />
      </div>
    );
}

export default Chatting
