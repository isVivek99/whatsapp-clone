import React from 'react'
import {Avatar} from '@material-ui/core';
import './SidebarChat.css'
//import {useState, useEffect} from 'react';
import db from '../firebase/firebaseConfig';
import { timestamp } from '../firebase/firebaseConfig';

function SidebarChat({  id, roomName, addNewChat,}) {
  
     

    

    const addNewChatHandler = () => {
        const name = prompt("enter room name:");
        if(name){
            db.collection("rooms").add({roomName:name,createdAt:timestamp });
        }
    }

    return (
        !addNewChat?(<div className="sidebarChat__parent">
        <div className="sidebarChat">
           <Avatar src={`https://avatars.dicebear.com/api/gridy/${id}.svg`} />  
           <div className="sidebarChat__info">
               <h3>{roomName}</h3>
               <p>message</p>
           </div>
       </div>  
   </div>):<div className="sidebarChat" onClick={addNewChatHandler}>
                <h3>Add new Chat</h3>
           </div>
        
                         
    )
}

export default SidebarChat
