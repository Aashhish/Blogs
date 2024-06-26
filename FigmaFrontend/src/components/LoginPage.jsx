import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import axios from "axios";
import { CiMail } from "react-icons/ci";
import { CiLock } from "react-icons/ci";

const Login = () => {
    const navigate = useNavigate();

    const [Data, setData] = useState({
        Email: "",
        Password: "",
    });

    const [errors, seterrors] = useState({});

    const handleLogin = async () => {
        let empty = {};
        if (!Data.Email.trim()) {
            empty.Email = "Required Field";
        }
        if (!Data.Password.trim()) {
            empty.Password = "Required Field"
        }
        if(Object.keys(empty).length === 0){
            const res = await axios.post(
                "http://localhost:5000/auth/Login",Data)
                console.log(res, "Resr")
                if(res.data.Token){
                    localStorage.setItem("token", res.data.Token);
                    localStorage.setItem("userID", res.data.userID);
                    navigate("/Body2");
                }
        }
        else {
            seterrors(empty);
            



        }
        seterrors(empty)
        setData({
            Email: "",
            Password: "",
        });


    };



    return (
        <div className="LoginMain">
        <div className="Login-Main">
            <h1 className="Login-Header">Login</h1>
            <ul className="Login-lists">
                <li className="Login-listitems"><CiMail className="Login-Icons" />
                    <input className="Login-input" type="text" placeholder="Email" value={Data.Email}
                        onChange={(e) => setData({ ...Data, Email: e.target.value })}>
                    </input>
                    {errors.Email && <span style={{ color: "red" }}>{errors.Email}</span>}
                </li>




                <li className="Login-listitems"><CiLock className="Login-Icons" />
                    <input className="Login-input" type="Password" placeholder="Password" value={Data.Password}
                        onChange={(e) => setData({ ...Data, Password: e.target.value })}>
                    </input><br></br>
                    <a className="Login-Forget" href="/ForgetPass">Forgot Password?</a>
                    {errors.Password && <span style={{ color: "red" }}>{errors.Password}</span>}
                </li>


            </ul>
            <button className="Login-Button" onClick={handleLogin}>Login</button><br></br>
            <div className="Login-link">
                <a className="Login-links" href="/SignUp">Don't Have an Account? Create Account</a><br></br>
            </div>
        </div>
        </div>
    )
}
export default Login;