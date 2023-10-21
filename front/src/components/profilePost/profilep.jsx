import { useState } from "react";
import "./profilep.scss";


export default function Profilep({post,i}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    return (
        <>
        <div className="profilepContainer">
            <div className="profilePosts">
                <img className="profilePostImg" src={PF+post.img} alt="" />
            </div>
        </div>
        </>
    )
}