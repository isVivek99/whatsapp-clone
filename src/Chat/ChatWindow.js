import React from 'react';
import './ChatWindow.css';
import {Avatar,IconButton} from '@material-ui/core';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import MicOutlinedIcon from '@material-ui/icons/MicOutlined';
import { useParams } from 'react-router';
import {useState, useEffect} from 'react';
import db from '../firebase/firebaseConfig';
import {timestamp} from '../firebase/firebaseConfig';
import { useContext } from 'react';
import {GlobalContext} from '../context/GlobalState';

function ChatWindow(){

    const[room, setRoom] = useState('');
    const[seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const roomId = useParams();
    const { user } = useContext(GlobalContext);
    var messageArray=[];

  useEffect(()=>{
      const unsub = db.collection("rooms").doc(roomId.roomId)
      .onSnapshot(snap=>{
   
        return(
        setRoom(snap.data().roomName),
        setSeed(roomId.roomId) 
        )      
      })
        return ()=>{
            unsub()
         }
  },[roomId.roomId])


  useEffect(()=>{
    db.collection("rooms").doc(roomId.roomId)
    .collection("messages")
    .orderBy('createdAt','asc')
    .onSnapshot(snap=>{
        setMessages(snap.docs.map(doc=>(
            doc.data()
        )))
    })
  },[roomId.roomId])

  messageArray = messages.map(message =>(
    <p className={`chat__message  ${message.name === user.displayName && "chat__reciever"}`}>
    <span className="chat__name">{message.name}</span>
    {message.message}
    <span className="chat__timestamp">{new Date(message.createdAt?.toDate()).toUTCString()}</span>
</p>
  ))


    const sendMessageHandler = (e) => {
        e.preventDefault();
        db.collection("rooms").doc(roomId.roomId)
            .collection("messages")
            .add(
                {
                    message:input,
                    name:user.displayName,
                    createdAt:timestamp
                }
            )
        setInput('');
    }

    return (
        <div className="chat__window">
            
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/gridy/${seed}.svg`} />
                <div className="chat__headerInfo">
                    <h2>{room}</h2>
                    <p>last seen  { new Date(messages[messages.length-1]?.createdAt?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerIcons">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileOutlinedIcon/>   
                    </IconButton>
                    <IconButton>
                        <MoreVertOutlinedIcon/>
                    </IconButton>
                </div>
            </div>  

            <div className="chat__body">
                {messageArray}
            </div>

            <div className="chat__bottom">
                <IconButton>
                    <SentimentSatisfiedOutlinedIcon/>
                </IconButton>
                <div className="chat_bottomInput">
                    <form >
                        <input 
                            type="text" 
                            placeholder="enter message" 
                            className="message" 
                            style={{padding:"10px",}}
                            value={input}
                            onChange={(e)=>setInput(e.target.value)}
                        />
                        <button type="submit" onClick={sendMessageHandler} >submit text</button >
                    </form>
                        
                </div>

                    <IconButton>
                            <MicOutlinedIcon/>
                    </IconButton>
            </div> 
     </div>
    )
}

export default ChatWindow
