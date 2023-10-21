import MapsUgcRounded from '@mui/icons-material/MapsUgcRounded';
import './topbar.scss';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { Link } from 'react-router-dom';

const Topbar = () => {
    return (
        <div>
            <div className="topbar">
                <div className="topbarLeft">
                    <span id="text1">Instagram</span>
                </div>
                <div className="topbarRight">
                        <FavoriteBorderRoundedIcon className='icon'/>
                    <Link to="/messenger">
                    <MapsUgcRounded className='icon'/>
                    </Link>
                </div>
            </div>
        </div>
    );
}
 

 
export default Topbar;