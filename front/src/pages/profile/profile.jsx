import "./profile.scss"
import Sidebar from "../../components/sidebar/sidebar";
import Profiler from "../../components/profileRight/profiler";
import { useParams } from "react-router-dom";

export default function Profile({}) {

    const params = useParams().username;

    return (
        <>
            <div className="profileContainer">
                <div className="sticky">
                    <Sidebar/>
                </div>
                <div className="noSticky">
                    <Profiler username={params}/>
                </div>
            </div>
        </>
    )
}