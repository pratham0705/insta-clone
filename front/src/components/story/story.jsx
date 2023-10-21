import "./story.scss"
import { useContext, useEffect, useState } from "react"
import axios from "axios"

export default function Story({user}) {
    useEffect(()=>{
        const getFriends = async()=>{
            try{
                const friendList = await axios.get("/product/friends/"+ user._id);
                setFriends(friendList.data);
            }catch(err){
                console.log(err)
            }
        }
        getFriends();
    },[user])  

    const [friends,setFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="story">
            <div className="storyWrapper">
               {friends.map((friend)=>(
                <div className="online">
                <div className="storyItem">
                        <img src={friend.profilePicture? PF+friend.profilePicture : PF+"pic/noAvatar.jpeg"} alt="" className="storyPic"/>
                        <span className="storyText">{friend.username}</span>
                </div>
            </div>
               ))}
            </div>
        </div>
    )
}