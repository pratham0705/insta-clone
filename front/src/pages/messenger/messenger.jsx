import "./messenger.scss";
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DensityMediumRoundedIcon from '@mui/icons-material/DensityMediumRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Conversation from "../../components/conversations/conversations";
import Message from "../../components/message/message";
import axios from "axios";
import { io } from "socket.io-client";

export default function Messenger(){

    const[conversations,setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const socket = useRef(io(("ws://localhost:8900")))
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);
    const scrollRef = useRef();

    const receiverId = currentChat?.members.find(member=> member !== user._id)

    useEffect(()=>{
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users=>{
            console.log(users)
        })
    },[user]);

    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage, currentChat])

    useEffect(()=>{
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", data=>{
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    },[]);

    useEffect(()=>{
        const getConversations = async()=>{
            try{
            const res = await axios.get("/conversation/"+user._id);
            setConversations(res.data);
            }catch(err){
                console.log(err);
            }
        };
        getConversations();
    },[user._id])

    useEffect(()=>{
        const getMessages = async()=>{
            try{
            const res = await axios.get("/message/"+currentChat?._id);
            setMessages(res.data);
            }catch(err){
                console.log(err);
            }
        };
        getMessages();
    },[currentChat]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: user._id,
          text: newMessage,
          conversationId: currentChat._id,
        };

        const receiverId = currentChat?.members.find(member=> member !== user._id)

        socket.current.emit("sendMessage",{
            senderId: user._id,
            receiverId,
            text:newMessage,
        })

        try{
            const res = axios.post("/message", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        }catch(err){
            console.log(err);
        }
    };


    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior : "smooth"})
    },[messages])

    return(

        <>
            <div className="messenger">
                <div className="sidebar">
                    <div className="sidebarWrapper">
                        <Link to='/' style={{textDecoration:"none"}}>
                        <span ><InstagramIcon className="sidebarIcon" id="instaIcon"/></span>
                        </Link>
                        <ul className="sidebarList">
                            <li className="sidebarListItem" >
                            <Link to="/" style={{textDecoration:"none"}}><HomeIcon id="homeIcon1"/></Link>
                            </li>
                            <li className="sidebarListItem">
                            <SearchIcon className="sidebarIcon"/>
                            </li>
                            <li className="sidebarListItem">
                            <ExploreOutlinedIcon className="sidebarIcon"/>
                            </li>
                            <li className="sidebarListItem">
                            <SlideshowIcon className="sidebarIcon"/>
                            </li>
                            <li className="sidebarListItem">
                            <Link to="/messenger" style={{textDecoration:"none"}}><MapsUgcRoundedIcon className="sidebarIcon"/></Link>
                            </li>
                            <li className="sidebarListItem">
                            <FavoriteBorderRoundedIcon className="sidebarIcon"/>
                            </li>
                            <li className="sidebarListItem">
                            <Link to="/create" style={{textDecoration:"none"}}><AddBoxOutlinedIcon className="sidebarIcon"/></Link>
                            </li>
                            <li className="sidebarListItem">
                            <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
                            <img src={user.profilePicture? PF+user.profilePicture : PF+"pic/noAvatar.jpeg"} alt="" className="profileImage"/>
                            </Link>
                            </li>
                            <li className="sidebarListItem" id="moreIcon1">
                            <DensityMediumRoundedIcon className="sidebarIcon"/>
                            </li>
                        </ul>
                </div>
                <div className="vl"></div>
                </div>
                <div className="inbox">
                    <div className="inboxWrapper">
                        <div className="inboxTop">
                            <div className="inboxTopTop">
                                <div className="inboxTopLeft">
                                    <Link to="/login" style={{textDecoration:"none"}}>
                                    {user.username}
                                    <KeyboardArrowDownOutlinedIcon className="downIcon"/>
                                    </Link>
                                </div>
                                <div className="inboxTopRight">
                                    <label htmlFor="search">
                                        <input type="text" id="search" className="sidebarListItemTextInput" />
                                        <EditCalendarOutlinedIcon className="editIcon"/>
                                    </label>
                                </div>
                            </div>
                            <div className="inboxTopBottom">
                                <div className="inboxTopLeft">
                                    <h6>Messages</h6>
                                </div>
                                <div className="inboxTopRight">
                                    <h6 className="req">Requests</h6>
                                </div>
                            </div>
                        </div>
                        <div className="inboxMain">
                            {conversations.map((c)=>(
                                <div onClick={()=>setCurrentChat(c)}>
                                    <Conversation conversation={c} currentUser={user}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat?
                        <>
                        <div className="chatBoxTop">
                            <div className="chatBoxTopLeft">
                                <img src={PF+"/pic/noAvatar.jpeg"} alt="" className="chatImg" />
                                <span className="chatName">{receiverId}</span>
                            </div>
                            <div className="chatBoxTopRight">
                                <InfoOutlinedIcon className="infoIcon"/>
                            </div>
                        </div>
                        <div className="chatBoxMain">
                            {messages.map((m) => (
                            <div ref={scrollRef}>
                            <Message message={m} own={m?.sender === user._id}/>
                            </div>
                            ))}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} className="chatMessage" placeholder="Message..."></textarea>
                            <button onClick={handleSubmit} className="sendBtn">Send</button>
                        </div>
                        </> : <>
                        <div className="else">
                        <span ><MapsUgcRoundedIcon className="messIcon"/></span>
                        <span className="mess">Your messages</span>
                        <span className="open">Send private photos and messages to a friend or group.</span>
                        <button className="sendMess">Send Message</button>
                        </div>
                        </>}
                    </div>
                </div>
               
            </div>
        </>
    )
}
