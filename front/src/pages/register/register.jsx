import { useRef } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const clickHandle = async (e)=>{
        e.preventDefault();
        const user = {
            username:username.current.value,
            email:email.current.value,
            password:password.current.value,
        };
        try{
        await axios.post("/auths/register", user);
        navigate("/login");
        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <form className="loginContainer" onSubmit={clickHandle}>
                <span id="text">Instagram</span>
                <input className="loginInput1" type="text" 
                placeholder="Create a username" 
                required 
                ref={username}/>
                <input className="loginInput2" type="email" 
                placeholder="Enter Your Email" 
                required 
                ref={email}/>
                <input className= "loginInput1" id="loginInput1" 
                type="password" 
                required 
                placeholder=" Create a password" 
                minLength="6"
                ref={password} />
                <div className="saveInfo">
                    <input className="loginTxt" type="checkbox"/>  
                    <h5 className="saveTxt">Save Login Info</h5>
                </div>
                <button className="loginBtn" type="sumbit">
                    Register
                    </button>
            </form>
        </>
    )
}