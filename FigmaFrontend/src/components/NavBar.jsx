import ProfilePic from "./images/Oval.png"
import logo from "./images/Group.png"
import Chatterly7 from "./images/Chatterly7.gif"
import { useNavigate } from "react-router-dom"
import { getBlog, getProfile } from "../endpoints";
import { useEffect, useState } from "react";
import "./NavBar.css"


const NavBar =()=>{
    const [UserData, setUserData] = useState({})
    const ID = localStorage.getItem("userID")

    const Navigate = useNavigate();

    const handleProfile =()=>{
    Navigate("/Profile")
    }

    const PrflPhoto =async()=>{
        try{
            const res = await getProfile(ID)
            setUserData(res.data.user);
            console.log(res.data.user);
        }catch(err){
            console.log(err, "Error Getting Profile Photo")
        }
    }


    const handleHome=()=>{
        Navigate("/Body2")
    }


    useEffect(()=>{
        PrflPhoto();
    },[])

    return(
        <>
            
            <div className="NavbarParent">
                <div className="navbar">
                
                    <img className="img" onClick={handleHome} src={Chatterly7}></img>
                    <div className="Profile" onClick={handleProfile}>
                        <img className="img1" src={`http://localhost:5000/${UserData.ProfilePhoto}`} alt="Profile"></img>
                        <span className="name">{UserData.UserName}</span>
                    </div>
                    <i className="vector1" class="fa-solid fa-chevron-down"></i>
                    <hr className="line1"></hr>
                    
                    
            </div>
            </div>
        





        </>
    )
}

export default NavBar;