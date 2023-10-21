import { useContext, useState } from 'react';
import './message.css';
import { AuthContext } from '../../context/AuthContext';

 
export default function Message({message, own}) {

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const {user} = useContext(AuthContext);


    return (
        <div className={own? "message own" : "message"}>
            <div className="messageMain">
                <img src={PF+"pic/noAvatar.jpeg"} alt="" className={own? "messageImg own" : "messageImg"} />
                <p className="msg">{message?.text}</p>
            </div>
        </div>
    );
}