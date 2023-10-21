import Sidebar from "../../components/sidebar/sidebar"
import Rightbar from "../../components/rightbar/rightbar"
import Feed from "../../components/feed/feed"
import "./home.scss"
import Topbar from "../../components/topbar/topbar"
import Bottom from "../../components/bottomBar/bottom"

export default function Home() {
    return (
        <>
            <div className="homeContainer1">
                <div className="sticky1" >
                    <Sidebar className="sidebar"/>
                </div>
                <div className="noSticky1">
                    <Feed className="feed"/>
                    <Rightbar className="rightbar"/>
                </div>
            </div>
            <div className="homeContainer2">
                <div className="noSticky2">
                    <Topbar className="topbar"/>
                    <Feed className="feed"/>
                </div>
                <div className="sticky2" >
                    <Bottom className="bottomBar"/>
                </div>
                
            </div>
        </>
    )
}