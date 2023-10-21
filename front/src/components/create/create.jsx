import { useContext, useRef, useState } from "react";
import "./create.scss"
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../sidebar/sidebar";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import axios from "axios";

export default function Create() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);

 const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/post", newPost);
      window.location.reload();
    } catch (err) {}
  };

    return(
        < >
            <div className="createContainer">
                <div className="sidebar">
                    <Sidebar/>
                </div>
                <div className="createRight">
                   
                    <form className="share" onSubmit={submitHandler}>
                        <div className="shareLeft">
                            <InsertPhotoOutlinedIcon className="icon1"/>
                            <SmartDisplayOutlinedIcon className="icon2"/>
                            <h4 className="h4">Drag photos and videos here</h4>
                            <label htmlFor="file" className="select">
                                <span htmlFor="file" className="shareBtn">Select From Computer</span>
                            </label>
                            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                        </div>
                        {file && (
                        <div className="shareImgContainer">
                            <img src={URL.createObjectURL(file)} className="shareImg1" alt="" />
                            <CancelOutlinedIcon className="cancelIcon" onClick={()=>setFile(null)}/>
                        </div>
                        )}
                        <div className="shareRight">
                            <button className="share2" type="submit">Share</button>
                            <div className="name">
                                <img src={user.profilePicture? PF+user.profilePicture : PF+"pic/noAvatar.jpeg"} alt="" className="nameImg" />
                                <h3 className="h3">{user.username}</h3>
                            </div>
                            <input type="text" placeholder="Write a caption..." className="caption" maxLength="200" ref={desc}/>
                            <div className="location">
                                <input type="text" className="locationText" placeholder="Add Location"/>
                                <PlaceOutlinedIcon className="locationIcon"/>
                            </div>
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
    )
}