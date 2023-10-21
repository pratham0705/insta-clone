import { useEffect, useState } from 'react';
import './conversations.css';
import axios from 'axios';

 
export default function Conversation({conversation, currentUser}) {

const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const[user,setUser]=useState({});

useEffect(()=>{
    const friendId = conversation.members.find((m)=>m !== currentUser._id);

    const getUser = async ()=>{
        try{
        const res = await axios.get("/product?userId="+ friendId);
        setUser(res.data);
        }catch(err){
            console.log(err);
        }
    };
    getUser();
},[currentUser, conversation])

    return (
        <div className='conversation'>
            <img src={user?.profilePicture? user.profilePicture : PF+"pic/noAvatar.jpeg"} alt="" className="conversationImg" />
            <span className="coversationName">{user?.username}</span>
        </div>
    );
}
 

 
