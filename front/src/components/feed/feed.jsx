"use client"
import "./feed.scss"
import Story from "../story/story"
import Post from "../post/post"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed() {

    const [post,setPost] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
          const res = await axios.get("post/timeline/"+ user._id);
          setPost(res.data.sort((p1,p2)=>{
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          }))
        };
        fetchPosts();
      }, [user._id]);
    
    return (
        <div className="feed">
            <div className="feedWrapper">
                <Story user={user}/>
                {post.map((p)=>(
                    <Post key={p._id} post={p}/>
                ))}
            </div>
        </div>
    )
}