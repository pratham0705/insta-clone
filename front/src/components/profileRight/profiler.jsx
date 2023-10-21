"use client"

import "./profiler.scss";
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useContext, useEffect , useState } from "react";
import axios from "axios";
import Profilep from "../profilePost/profilep";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";



export default function Profiler({username}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user,dispatch} = useContext(AuthContext);
    const params = useParams().username;
    const [post,setPost] = useState([]);
    const [product,setProduct] = useState({});
    const [followed,setFollowed] = useState();

    useEffect(()=>{
        setFollowed(user.followings.includes(product._id));
    },[user, product._id]);
    
    useEffect(() => {
            const fetchPosts = async () => {
            const res = await axios.get("/post/profile/"+username);
            setPost(res.data.sort((p1,p2)=>{
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }))
        };
        fetchPosts();
      }, [username]);

    

    useEffect(() => {
            const fetchUser = async () => {
            const res = await axios.get(`/product?username=${params}`);
            setProduct(res.data)
        };
        fetchUser();
      }, [params]);

    const followHandler = async ()=>{
        try{
            if(followed){
                await axios.put("/product/"+product._id+"/unfollow", {userId:user._id});
                dispatch({type:"UNFOLLOW", payload:product._id})
            }else{
                await axios.put("/product/"+product._id+"/follow", {userId:user._id});
                dispatch({type:"FOLLOW", payload:product._id})
            }
        }catch(err){
            console.log(err)
        }
        setFollowed(!followed);
    }

            return(
                <div className="profileRight" >
                    <div className="profileRightTop">
                        <div className="profileRightTopLeft">
                            <img src={ product.profilePicture? PF+product.profilePicture : PF+"pic/noAvatar.jpeg"} alt="" className="profileImg"/>
                        </div>
                        <div className="profileRightTopRight">
                            <div className="profileRightTopRight1">
                                <span className="profileUsername">
                                    {product.username}
                                </span>
                                <div className="btn">
                                {product.username === user.username && (
                                    <button className="profileButton" >
                                        Edit Profile
                                    </button>    
                                )}
                                {product.username === user.username && (
                                    <button className="profileButton" >
                                        View Archive
                                    </button>    
                                )}
                                {product.username !== user.username && (
                                    <button className="profileButton" onClick={followHandler} >
                                        {followed ? "Unfollow" : "Follow"}
                                    </button>    
                                )}
                                </div>    
                                <SettingsIcon/>
                            </div>
                            <div className="profileRightTopRight2">
                                <h4 className="info"><span>4</span> posts</h4>
                                <h4 className="info"><span>{user.username===product.username? user.followers.length: "" }</span> Followers</h4>
                                <h4 className="info"><span>{user.username===product.username? user.followings.length:""}</span> Followings</h4> 
                            </div>
                            <div className="profileRightTopRight3">
                                <h4 className="info" id="info">{product.desc}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="profileMiddle">
                        <div className="user">
                            <span className="profileUsername1">
                                {product.username}
                            </span>
                            <span className="profileUsername1" id="profileBio">
                                {product.desc}
                            </span>
                        </div>
                        <div className="btn1">
                            {product.username === user.username && (
                                <button className="profileButton" >
                                    Edit Profile
                                </button>    
                                )}
                            {product.username === user.username && (
                                <button className="profileButton" >
                                    View Archive
                                </button>    
                                )}
                            {product.username !== user.username && (
                                <button className="profileButton" onClick={followHandler} >
                                    {followed ? "Unfollow" : "Follow"}
                                </button>    
                                )}
                        </div>
                    </div>
                    <div className="profileHighlights">
                    <AddCircleRoundedIcon className="highlightIcon"/>
                    <h4 className="new">New</h4>
                    <hr className="hr2"/>
                    </div>
                    <div className="profilePostText">
                        <div className="profilePostTextMain">
                            <span><GridOnRoundedIcon className="profilePostTextIcon"/></span>
                            <h5 id="profilePostTaggedIcon">POSTS</h5>
                        </div>
                        <div className="profilePostTextMain">
                            <span><SlideshowIcon className="profilePostTextIcon"/></span>
                             <h5 id="profilePostTaggedIcon">REELS</h5>
                        </div>
                        <div className="profilePostTextMain">    
                            <span><BookmarkBorderRoundedIcon className="profilePostTextIcon"/> </span>
                            <h5 id="profilePostTaggedIcon">SAVED</h5>
                        </div>
                        <div className="profilePostTextMain">
                            <span><AssignmentIndRoundedIcon className="profilePostTextIcon" id="profilePostTaggedIcon"/> </span>
                            <h5 id="profilePostTaggedIcon">TAGGED</h5>
                        </div>
                    </div>
                    <div className="profilePost">
                        {post.map((p,i)=>(
                            <Profilep key={p._id} post={p} index={i}/>
                        ))}
                    </div>
                    <div className="profileRightBottom">
                        <div className="profileRightBottomDiv">
                            <a href="#" className="misc">  Meta </a>
                        </div>
                        <div className="profileRightBottomDiv">
                            <a href="#" className="misc">  About </a>
                        </div>
                        <div className="profileRightBottomDiv">
                            <a href="#" className="misc">  Blog </a>
                        </div>
                        <div className="profileRightBottomDiv">
                            <a href="#" className="misc">  Jobs </a>
                        </div>
                        <div className="profileRightBottomDiv">
                            <a href="#" className="misc">  Help </a>
                        </div>
                        <div className="profileRightBottomDiv">
                            <a href="#" className="misc">  API </a>
                        </div>
                        <div className="profileRightBottomDiv">
                            <a href="#" className="misc">  Privacy </a>
                        </div>
                        <div className="profileRightBottomDiv">
                            <a href="#" className="misc">  Terms </a>
                        </div>
                        <div className="profileRightBottomDiv">
                            <a href="#" className="misc">  Location </a>
                        </div>
                        <div className="profileRightBottomDiv">
                            <a href="#" className="misc">  Instagram Lite </a>
                        </div>
                        <div className="profileRightBottomDiv">
                            <a href="#" className="misc">  Threads </a>
                        </div>
                        <div className="profileRightBottomDiv">
                            <a href="#" className="misc">  Contact uploading and non-users </a>
                        </div>
                        <div className="profileRightBottomDiv">
                            <a href="#" className="misc">  Meta Verified </a>
                        </div>
                    </div>
                    <div className="profileRightBottomest">
                        <h4 className="igg">English(UK)</h4>
                        <h4 className="igg">2023 Instagram from Meta</h4>
                    </div>
                </div>
)};