import React, { useContext } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import "./bottom.scss"
 
const Bottom = () => {

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
                <div>
                        <div className="bottomBox">
                            <Link to="/login" style={{textDecoration:"none"}}><HomeIcon id="homeIcon"/></Link>
                            <SearchIcon className="sidebarIcon"/>
                            <Link to="/create" style={{textDecoration:"none"}}><AddBoxOutlinedIcon className="sidebarIcon"/></Link>
                            <SlideshowIcon className="sidebarIcon"/>
                            <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
                            <img src={user.profilePicture? PF+user.profilePicture : PF+"pic/noAvatar.jpeg"} alt="" className="profileImage"/>
                            </Link>

                        </div>
                </div>
    );
}
 
export default Bottom;