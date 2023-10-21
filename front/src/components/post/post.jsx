"use client"

import "./post.scss"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import { useState , useEffect, useContext } from "react";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {format} from "timeago.js";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Comments from "../comments/comments";


export default function Post({post}) {
    const [like,setlike] = useState(post.likes.length)
    const [isLiked,setisLiked] = useState(false)
    const [title,settitle] = useState("")
    const [mainTask,setmainTask] = useState([])
    const [user,setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);
    const [commentOpen,setCommentOpen] = useState(false);



    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/product?userId=${post.userId}`);
          setUser(res.data)
        };
        fetchUser();
      }, []);

    useEffect(()=>{
        setisLiked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])

    const likeHandler =()=>{
        try{
            axios.put("/post/"+post._id+"/like", {userId:currentUser._id})
        }catch(err){}
        setlike(isLiked ? like-1 : like+1)
        setisLiked(!isLiked)
    }

    const commentOpener = (e) =>{
        e.preventDefault();
        setCommentOpen(!commentOpen);
        
    }

    // const submitHandler = (e)=>{
    //     e.preventDefault()
    //     setmainTask([...mainTask, {title}])
    //     console.log(mainTask)
    //     settitle("")
    // }

    // const deleteHandler=(i)=>{
    //     let copyTask = [...mainTask]
    //     copyTask.splice(i,1)
    //     setmainTask(copyTask)
    // }

    // let renderTask = <h5 className="noComments">No Comments</h5>

    // if(mainTask.length>0){
    //     renderTask = mainTask.map((t,i)=>{
    //         return <li className="commentList" key={i}> 
    //             <div className="comment1">
    //                 <h4>{t.title}</h4>
    //                 <button className="deleteBtn" onClick={()=>{
    //                     deleteHandler(i)
    //                 }}><DeleteOutlineIcon/></button>
    //             </div>
    //         </li>
    //     })
    // }
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img src= {user.profilePicture? PF+user.profilePicture : PF+"pic/noAvatar.jpeg" } alt="" className="postImg" />
                        </Link>
                        <span className="postText">{user.username}</span>
                        <span className="postTime"> <FiberManualRecordIcon className="postTimeIcon"/>{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight"> <MoreHorizIcon/>
                    </div>
                </div>
                <div className="postCenter">
                    <img src={PF+post.img} alt="" className="posted" />
                    <div className="postAtt">
                        <div className="postAttLeft">
                            <FavoriteBorderIcon onClick={likeHandler}/>
                            <div className="commentOpen" onClick={commentOpener}>
                            <MapsUgcRoundedIcon/>
                            </div>
                            
                            <SendRoundedIcon/>
                        </div>
                        <div className="postAttRight">
                            <BookmarkBorderRoundedIcon/>
                        </div>
                    </div>
                </div>
                <div className="postBottom">
                    <span className="likes">{like} likes</span>
                    <span className="postText"> {user.username} <span className="caption"> {post?.desc} </span></span>
                    {/* <form className="form" onSubmit={submitHandler}> */}
                        {/* <input 
                            placeholder="Add a comment..." 
                            className="comment" 
                            value={title}
                            onChange={(e)=>{
                                settitle(e.target.value)
                            }}>
                        </input>
                        <button className="postbtn">Post</button> */}
                        {commentOpen && <Comments/>}
                    {/* </form> */}
                    {/* <div className="render">
                        <ul>
                            {renderTask}
                        </ul>
                    </div> */}
                </div>
                <hr className="hr"/>
            </div>
        </div>
    )
}