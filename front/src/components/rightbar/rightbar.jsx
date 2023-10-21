import "./rightbar.css"
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import Suggestion from "../suggestion/suggestion";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function Rightbar() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const{user} = useContext(AuthContext);
    return (
        <div className="rightbar">
           <div className="rightbarWrapper">
                <div className="rightbarTop">
                    <div className="rightbarTopLeft">
                        <img src={user.profilePicture? PF+user.profilePicture : PF+"pic/noAvatar.jpeg"} className="rightImg" alt="" />
                        <div className="username">
                        <Link to={`profile/${user.username}`}>{user.username}</Link>
                            <span className="rightText">{user.username}</span>
                        </div>
                    </div>
                    <div>
                        <Link to="/login" style={{textDecoration:"none"}}>
                            <span className="switch">Switch</span>
                        </Link>
                    </div>
                </div>
                <div className="rightbarCenter">
                    <div className="rightbarCenterTop">
                        <div className="rightbarCenterTopLeft">
                            <span className="sugg">Suggested for you</span>
                        </div>
                        <div className="rightbarCenterRight">
                            <span className="see">See All</span>
                        </div>
                    </div>
                    <div className="rightbarCenterMain">
                        <Suggestion user={user}/>
                    </div>
                </div>
                <div className="rightbarBottom">
                    <div className="rightbarBottomDiv">
                        <FiberManualRecordRoundedIcon className="miscIcon"/>
                        <a href="#" className="misc">  About </a>
                    </div>
                    <div className="rightbarBottomDiv">
                        <FiberManualRecordRoundedIcon className="miscIcon"/>
                        <a href="#" className="misc">  Help </a>
                    </div>
                    <div className="rightbarBottomDiv">
                        <FiberManualRecordRoundedIcon className="miscIcon"/>
                        <a href="#" className="misc">  Press </a>
                    </div>
                    <div className="rightbarBottomDiv">
                        <FiberManualRecordRoundedIcon className="miscIcon"/>
                        <a href="#" className="misc">  API </a>
                    </div>
                    <div className="rightbarBottomDiv">
                        <FiberManualRecordRoundedIcon className="miscIcon"/>
                        <a href="#" className="misc">  Jobs </a>
                    </div>
                    <div className="rightbarBottomDiv">
                        <FiberManualRecordRoundedIcon className="miscIcon"/>
                        <a href="#" className="misc">  Privacy </a>
                    </div>
                    <div className="rightbarBottomDiv">
                        <FiberManualRecordRoundedIcon className="miscIcon"/>
                        <a href="#" className="misc">  Location </a>
                    </div>
                    <div className="rightbarBottomDiv">
                        <FiberManualRecordRoundedIcon className="miscIcon"/>
                        <a href="#" className="misc">  Language </a>
                    </div>
                     <div className="rightbarBottomDiv">
                        <FiberManualRecordRoundedIcon className="miscIcon"/>
                        <a href="#" className="misc">  Meta Verified </a>
                    </div>
                </div>
                <div className="rightbarBottomest">
                    <span className="ig"><span className="c">C</span >   2023 INTAGRAM FROM META</span>
                </div>
           </div>
        </div>
    )
}