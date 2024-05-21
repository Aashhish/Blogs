import React, { useEffect, useState } from "react";
import './UserProfile.css';
import { useNavigate, useParams } from "react-router-dom";
import { PatchProfilePhoto, UpdateUserProfile, deleteUserProfile, getProfile } from "../endpoints";
import Profile1 from "./images/Profile1.jpg"

const UserProfile =()=>{
    const {id} = useParams();
    const Navigate = useNavigate();
    const UserID = localStorage.getItem('userID')
    const [ProfilePic, setProfilePic] = useState("")
    const [Edit, setEdit] = useState(false)
    const [ChoosePic, setChoosePic] = useState(false)
    const [UserData, setUserData] = useState({
            UserName: "",
            Email: "",
            Phone: "",
            Country: "",
            State: "",
            PinCode: "",
            ProfilePhoto: "",
            
    })
    const fetchUser = async()=>{
        try{
            const res = await getProfile(UserID)
            console.log(res.data,'fkfdk')
            setUserData({
                UserName: res.data.user.UserName,
                Email: res.data.user.Email,
                Phone: res.data.user.Phone,
                Country: res.data.user.Country,
                State: res.data.user.State,
                PinCode: res.data.user.PinCode,
                ProfilePhoto: res.data.user.ProfilePhoto
        })
        }catch(err){
            console.log(err, "Error getting UserProfile")
        }
    }

    useEffect(()=>{
        fetchUser()
    },[Edit])


    const handleLogOut=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("userID")
        Navigate("/")
    }

    const handleDeleteUser=async()=>{
        try{
        localStorage.removeItem("token")
        localStorage.removeItem("userID")
        const res = await deleteUserProfile(UserID)
        console.log(res, "User Profile Deleted ")
        Navigate("/")
        }catch(err){
            console.log(err,"Error Deleting User")
        }
    }

    const handleHome =()=>{
        Navigate("/Body2")
    }

    const handleEdit =()=>{
        fetchUser();
        setChoosePic(true)
        setEdit(true)
    }



    const handleProfilePhoto=async()=>{
        try{
        const formdata = new FormData();
        formdata.append("ProfilePhoto", ProfilePic);
        await PatchProfilePhoto(formdata,UserID);
    }catch(err){
        console.log(err, "Error Updating Profile Photo")
    }
    }




    const handleSave=async()=>{
        try{
            const userData = {
                UserName: UserData.UserName,
                Email: UserData.Email,
                Phone:UserData.Phone,
                State: UserData.State,
                PinCode: UserData.PinCode,
                Country: UserData.Country,
                
            };
            await UpdateUserProfile(userData, UserID);
             handleProfilePhoto()
            fetchUser();
            setEdit(false)
            setChoosePic(false)

        }catch(err){
            console.log(err, "Error Updating User Profile")
        }
    }



    const handleCancel=()=>{
        setUserData({
            UserName: "",
            Email: "",
            Phone: "",
            Country: "",
            State: "",
            PinCode: "",
            ProfilePhoto: "",
        })
        fetchUser();
        setChoosePic(false)
        setEdit(false)
    }

console.log(UserData,'fdskjdfkj')
    return(
        <>
        <div className="Profile-Page-Main">
        <div className="ProfileInfo">Profile Info</div>

        <div className="Main-User-Profile">
            <div className="UserProfile-Navbar">
                <span className="UserProfile-NavbarHead">Chatterly</span>
                <span style={{backgroundColor:'#7b66ff'}} className="UserProfile-NavbarItems">Profile</span>
                <span className="UserProfile-NavbarItems" onClick={()=>handleHome()}>Home</span>
                <span className="UserProfile-NavbarItems" onClick={()=>handleLogOut()}>Logout</span>
                <span className="UserProfile-NavbarItems" onClick={()=>handleDeleteUser()}>Delete Account</span>
            </div>
            <div className="UserProfile-PicCard">
                <img className="UserProfile-Pic" src={`http://localhost:5000/${UserData.ProfilePhoto}`} alt=""></img>
                <span className="UserProfile-Name">{UserData.UserName}</span>

                {ChoosePic?(
                <input type="file" className="UserProfile-UpdateButton" accept="image/*" onChange={(e)=>{
                    if(e.target.files.length){
                        const selectedFile = e.target.files[0];
                        setProfilePic(selectedFile);
                    }
                    else{
                        setProfilePic({})
                    }
                }}></input>):(<></>)}
                

            </div>
            <div className="UserProfile-Information">
                <p className="UserProfile-Information-Head">Change Your Information Here</p>

            {Edit?(
                <>
                <div className="UserProfile-Information-InputMain">
                    <input className="UserProfile-Information-Input" type="text" placeholder="UserName" value={UserData.UserName} onChange={(e)=>{setUserData({...UserData,UserName:e.target.value})}}></input>
                    <input className="UserProfile-Information-Input" type="text" placeholder="Email" value={UserData.Email} onChange={(e)=>{setUserData({...UserData,Email:e.target.value})}}></input>
                    <input className="UserProfile-Information-Input" type="text" placeholder="Phone Number" value={UserData.Phone} onChange={(e)=>{setUserData({...UserData,Phone:e.target.value})}}></input>
                    <input className="UserProfile-Information-Input" type="text" placeholder="Zip Code" value={UserData.PinCode} onChange={(e)=>{setUserData({...UserData,PinCode:e.target.value})}}></input>
                    <input className="UserProfile-Information-Input" type="text" placeholder="State" value={UserData.State} onChange={(e)=>{setUserData({...UserData,State:e.target.value})}}></input>
                    <input className="UserProfile-Information-Input" type="text" placeholder="Country" value={UserData.Country} onChange={(e)=>{setUserData({...UserData,Country:e.target.value})}}></input>
                </div>
                <div className="UserProfile-Buttons">
                    <button className="UserProfile-Edit" onClick={()=>handleCancel()}>Cancel</button>
                    <button className="UserProfile-Save" onClick={()=>handleSave()}>Save</button>
                </div>
            </>
                
):(
        <>
            <div className="UserProfile-Information-InputMain">
                <span className="UserProfile-Information-Span">{UserData.UserName}</span>
                <span className="UserProfile-Information-Span">{UserData.Email}</span>
                <span className="UserProfile-Information-Span">{UserData.Phone}</span>
                <span className="UserProfile-Information-Span">{UserData.PinCode}</span>
                <span className="UserProfile-Information-Span">{UserData.State}</span>
                <span className="UserProfile-Information-Span">{UserData.Country}</span>                
            </div>
            <div className="UserProfile-Buttons">
                <button className="UserProfile-Edit" onClick={()=>handleEdit()}>Edit</button>
                <button className="UserProfile-Save" onClick={()=>handleSave()}>Save</button>
            </div>
        </>
                )}
                
            </div>
        </div>
        </div>
        </>
    )
}
export default UserProfile;