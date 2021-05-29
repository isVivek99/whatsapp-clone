import React from 'react'
import './Sidebar.css';
import {Avatar, IconButton} from '@material-ui/core';
import {DonutLarge, MoreVert, Chat} from "@material-ui/icons";
import SearchOutlined from '@material-ui/icons/Search';
import SidebarChat from "./SidebarChat";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {GlobalContext} from '../context/GlobalState';
import db from '../firebase/firebaseConfig';


function Sidebar() {

    const [rooms, setRooms] =useState([]);
    const { user } = useContext(GlobalContext);
    console.log(user);

    useEffect(()=>{
        const unsub = db.collection("rooms").orderBy('createdAt','desc').onSnapshot(snap => {
            setRooms(snap.docs.map((doc)=>{
              
              
                return{
                   data : doc?.data(),
                   id : doc.id,
               } 
            }))
        })
        return ()=>{
            unsub();
        }
    },[])

    const roomsArray = rooms.map(room => (
        <Link to={`/rooms/${room.id}`} style={{textDecoration:"none", color:"black"}} key={room.id}>
            <SidebarChat  roomName={room.data.roomName} id={room.id} /> 
        </Link>
    ));

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src = {user?.photoURL}/>
                <div className="sidebar__headerRight">
                <IconButton>
                    <DonutLarge/>
                </IconButton>
                <IconButton>
                    <Chat/>
                </IconButton>
                <IconButton>
                    <MoreVert/>
                </IconButton>
            </div>
            </div>
            
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                <IconButton>
                    <SearchOutlined/>
                </IconButton>
                    <input type="text" placeholder="search or start a new chat"/>
                </div>
            </div>

            <div className="sidebarChat__parent">
                <SidebarChat  addNewChat />
                {roomsArray}
            </div>
        </div>
    )
}

export default Sidebar;