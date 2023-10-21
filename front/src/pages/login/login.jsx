import { useContext, useRef } from "react";
import "./login.css";
import { Link,  useNavigate } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";
import {CircularProgress} from "@mui/material"


export default function Login() {

    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const clickHandle=(e)=>{
        e.preventDefault();
        loginCall( {email: email.current.value, password: password.current.value} , dispatch);
        navigate("/");
    };

    return (
        <>
            <form className="loginContainer" onSubmit={clickHandle}>
                <span id="text">Instagram</span>
                <input className="loginInput" type="email" 
                placeholder="Phone number, username or email adress" 
                required 
                ref={email}/>
                <input className= "loginInput" id="loginInput1" 
                type="password" 
                required 
                placeholder="Password" 
                minLength="6"
                ref={password} />
                <div className="saveInfo">
                    <input className="loginTxt" type="checkbox"/>  
                    <h5 className="saveTxt">Save Login Info</h5>
                </div>
                <button className="loginBtn" disabled={isFetching} type="submit">
                    {isFetching? <CircularProgress color="success" size="15px"/>:"Log In"}
                    </button>
                <a href="#" className="loginForgot">Forgotten Your Password?</a>
                <div >
                    <Link to='/register' className="register" style={{textDecoration:"none"}} > Dont have an account?</Link>
                </div>
            </form>
        </>
    )
}
