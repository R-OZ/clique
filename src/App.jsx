  import React, {useEffect, useState} from 'react'
import {StreamChat} from 'stream-chat';
import { Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer, Auth, Clique} from './components';

import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();

const apikey = 'btgbh2bw36p7';
const authToken = cookies.get("token");


const client = StreamChat.getInstance(apikey);

if(authToken) {
  client.connectUser({
      id: cookies.get('userId'),
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      image: cookies.get('avatarURL'),
      hashedPassword: cookies.get('hashedPassword'),
      phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}



const App = () => {
  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [myTime, setMyTime] = useState(false)

  setTimeout(()=> setMyTime(true), 3100)


  if (!myTime) return <Clique />
  if(!authToken) return <Auth />
  return (
    <div className='app__wrapper'>
        <Chat client ={client} theme="team light">
            <ChannelListContainer
              isCreating = {isCreating}
              setIsCreating = {setIsCreating}
              setCreateType = {setCreateType}
              setIsEditing = {setIsEditing}
            
            />
            <ChannelContainer
              isCreating = {isCreating}
              setIsCreating = {setIsCreating}
              isEditing = {isEditing}
              setIsEditing = {setIsEditing}
              createType = {createType}
            
            />
        </Chat>
    </div>
  )
}

export default App