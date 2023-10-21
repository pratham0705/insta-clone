import { useContext, useEffect, useState } from "react";
import "./suggestion.css"
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Suggestion({user}) {

    useEffect(()=>{
        const getFriends = async()=>{
            try{
                const friendList = await axios.get("/product/all");
                setFriends(friendList.data);
            }catch(err){
                console.log(err)
            }
        }
        getFriends();
    },[])  ;

    const [friends,setFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <>
            <div className="suggestion">
                <div className="follow">
                            {friends.map((friend)=>(
                            <div className="rightbarTop">
                                <div className="rightbarTopLeft">
                                    <img src={friend.profilePicture? PF+friend.profilePicture : PF+"pic/noAvatar.jpeg"} className="rightImg" alt="" />
                                    <div className="username">
                                        <a href="#">{friend.username!==user.username? friend.username : "My Profile"}</a>
                                        <span className="rightText">{friend.username!==user.username? friend._id : ""}</span>
                                    </div>
                                </div>
                                <div>
                                    <Link to={`profile/${friend.username}`}>
                                        <button className="switch">{friend.username!==user.username? "Follow" : ""}</button>
                                    </Link>
                                </div>
                             </div>
                            ))}
                        </div>
                </div>
        </>
    )
    
};