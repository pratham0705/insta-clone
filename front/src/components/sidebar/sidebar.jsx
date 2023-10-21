import "./sidebar.scss"
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import MapsUgcRoundedIcon from '@mui/icons-material/MapsUgcRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DensityMediumRoundedIcon from '@mui/icons-material/DensityMediumRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Sidebar() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user} = useContext(AuthContext);

    return (
        <div className="sidebar">
                <div className="sidebarWrapper">
                    <Link to='/' style={{textDecoration:"none"}}>
                    <span id="text1">Instagram</span>
                    <InstagramIcon className="instaIcon"/>
                    </Link>
                    <ul className="sidebarList">
                        <li className="sidebarListItem" id="homeIcon">
                        <HomeIcon className="sidebarIcon"/>
                        <Link to="/" className="sidebarListItemText" style={{textDecoration:"none"}}>Home</Link>
                        </li>
                        <li className="sidebarListItem">
                        <SearchIcon className="sidebarIcon"/>
                        <input placeholder="Search" type="text" className="sidebarListItemText"/>
                        </li>
                        <li className="sidebarListItem">
                        <ExploreOutlinedIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Explore</span>
                        </li>
                        <li className="sidebarListItem">
                        <SlideshowIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Reels</span>
                        </li>
                        <li className="sidebarListItem">
                        <Link to={"/messenger"} style={{textDecoration:"none"}}>
                        <MapsUgcRoundedIcon className="sidebarIcon"/>
                        </Link>
                        <Link to={"/messenger"} style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Messages</span>
                        </Link>
                        </li>
                        <li className="sidebarListItem">
                        <FavoriteBorderRoundedIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">Notification</span>
                        </li>
                        <li className="sidebarListItem">
                        <Link to="/create" style={{textDecoration:"none"}}> 
                        <AddBoxOutlinedIcon className="sidebarIcon"/>
                        </Link>
                        <Link to="/create" style={{textDecoration:"none"}}> 
                        <span className="sidebarListItemText">Create</span>
                        </Link>
                        </li>
                        <li className="sidebarListItem">
                        <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
                        <img src={user.profilePicture? PF+user.profilePicture : PF+"pic/noAvatar.jpeg"} alt="" className="profileImage"/>
                        </Link>
                        <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}}>
                        <span className="sidebarListItemText">Profile</span>
                        </Link>
                        </li>
                        <li className="sidebarListItem" id="moreIcon2">
                        <DensityMediumRoundedIcon className="sidebarIcon"/>
                        <span className="sidebarListItemText">More</span>
                        </li>
                    </ul>
            </div>
            <div className="vl"></div>
        </div>
    )
}