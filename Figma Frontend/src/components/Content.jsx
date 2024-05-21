import React, { useEffect, useState } from "react"
import './Content.css'
import { getBlogDetails } from "../endpoints"
import { useParams } from "react-router-dom"
import { BsEmojiLaughing } from "react-icons/bs";
import Profile1 from "./images/Profile1.jpg"


    




const Content = ()=>{
    const {id}=useParams();
    const [formData, setFormData]=useState({})
    
    
    const getProfile=async()=>{
        try{
            console.log(id);
            const res=await getBlogDetails(id);
            console.log(res.data);
            setFormData(res.data);
    
        }catch(err){
            console.log(err, "Error getting ContentData")
        }
    }
    

    useEffect(()=>{
        getProfile();
    },[]);


console.log(formData,'jjg')

    return(
        <>
        <div className="ContentHead">
            <div>
                <span className="content-title">{formData.Title}</span>
                <div className="content-img-div"><img className="content-img" src={`http://localhost:5000/${formData.image}`}></img></div>
                <span>{formData.Description}</span>
            </div>
            <div className="content-Comments-Box">
                <span className="content-Comments">Comments</span><hr className="content-line1"></hr>
                <div className="Content-Comments-div">
                    <span>{formData?.Comments?.map((item)=>{
                        return<>
                        <div className="content-Comment-sec">
                            <img className="content-Profile-pic" src={Profile1}></img>
                            <span className="content-Username">Username</span>
                            <p className="content-Comment-text">{item.text}</p>
                        </div>
                         </>
                    })}</span>
                </div>
                <hr className="content-line2"></hr>

                <div className="content-inupt-Box">
                    <input className="content-inupt" placeholder="Add a comment..."></input>
                    <BsEmojiLaughing className="content-Emoji" />
                </div>
            </div>
        </div>
        </>
    )
}
export default Content;