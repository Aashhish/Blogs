import React from "react"
import axios from "axios"
import NavBarLower from './NavBarLower';
import Artical2 from "./images/Article_Image.png"
import profilePic2 from "./images/Ellipse 80.png"
import vector from "./images/Vector.svg"
import vector2 from "./images/Vector (1).svg"
import background from "./images/BackGround.jpg"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {FaHeart, FaComment } from "react-icons/fa6"
import { FaRegHeart } from "react-icons/fa6";
import {MdDelete} from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { PiShareFatFill } from "react-icons/pi";
// import { useDispatch, useSelector } from "react-redux";
// import { getPost } from "../Redux/Actions/Blog";

import './Body2.css';
import { SaveComments, deleteComments, getComments, getProfile } from "../endpoints"


const Body2 = () => {
    const Navigate = useNavigate();
    const [Post, setPost] = useState([]);
    const [Like, setLike] = useState({});
    const [PopUp, setPopUp] = useState(false);
    const [text, settext] = useState("");
    const [Render, setRender] = useState(false)


    // const dispatch = useDispatch();
    // const { blog } = useSelector((state) => state.blog)

    // console.log(blog, "345")


    
    // useEffect(()=>{
    //     dispatch(getPost());
    // },{Render})


    const fetchPost = async()=>{
        try{
            const token = localStorage.getItem("token");
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
            const res = await axios.get("http://localhost:5000/blogs/Blog", {headers,});
            if(res.data){
                setPost(res.data);
                
            }
        }catch(err){
            console.log(err);
        } 
    };


    const handleClick= ()=>{
        Navigate("/AddBlog")
               
    };



    useEffect(()=>{
        fetchPost();
        
    },[Like]);
    
    

    const handleDelete = async (id) => {
        try {
          const token = localStorage.getItem("token");
          const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          };
          await axios.delete(`http://localhost:5000/blogs/Blog/${id}`, { headers });
          fetchPost();
        } catch (error) {
          console.log(error);
        }
      };


      const handleSaveComments=async(text, PostID)=>{
        try{
            await SaveComments(text, PostID)
            setRender(!Render)
        }catch(err){
            console.log(err,"Comments Save Error")
        }
      }

      const handleDeleteComments=async(PostID,CommentsID )=>{
        try{
            await deleteComments(PostID,CommentsID)
            fetchPost();
        }catch(err){
            console.log(err, "Comments Delete Error")
        }        
      }


      const like = (PostID) =>{
        try{
        setLike((prevLike) =>({...prevLike, [PostID]: !prevLike[PostID],}))
        setRender(!Render)
        } catch (error){
            console.log(error)
        }
    };



    const DisplayPopUp =(PostID)=>{
        setPopUp(PostID);
        
    }


    const HidePopUp =()=>{
        setPopUp(false)
    }



    const handleContent=(id)=>{
        Navigate(`/Content/${id}`)
    }




      return (
        <>
        <NavBarLower setPost={setPost}></NavBarLower>
        <div className="NewBlog">
            <h4 className="Newtxt">Blog Posts</h4>
            <div className="AddBlogButtonMain">
            <button className="AddBlogButton" onClick={handleClick}>Add Blog</button>
            </div>
        </div>
            <div className="NewRectangle1">
                {Post.map((post) => {
                    const months = [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ];
                    const createDate = new Date(post.createdDate);
                    let day = createDate.getDate();
                    let monthIndex = createDate.getMonth();
                    let year = createDate.getFullYear();
                    let monthName = months[monthIndex];
                    let currentDate = `${monthName} ${day}, ${year}`;
    
                    return (
                        <>
                        {PopUp === post._id && (
                                <div className="PopUp">
                                    <div className="PopUpContent">
                                    <IoIosClose className="Exit" onClick={HidePopUp}></IoIosClose>
                                    <span className="Body-Comment-Text">Comments</span><br></br>
                                        <span className="CommentSec">{post.Title}</span>
                                        <div className="Comments">
                                            {post.Comments.length ? post.Comments.map((Comments,index)=>{
                                                return(
                                                    <>
                                                    <div className="CommentBox">
                                                        <div className="CommentsDiv" key={index}>
                                                            {Comments.text} <MdDelete className="CommentDelete" onClick={()=>handleDeleteComments(post._id,Comments._id)}></MdDelete>
                                                        </div>
                                                    </div>
                                                    </>
                                                )
                                            }):<span className="Default Comment">Be The 1st One To Comment🔥</span>}
                                        </div>
                        
                                        <div className="InputSend">
                                        <input className="CommentInput" placeholder="Share Your Views" value={text} onChange={(e)=> settext(e.target.value)}></input>
                                        <PiShareFatFill className="Send" onClick={()=> handleSaveComments({text}, post._id)}></PiShareFatFill>
                                        </div>
                                    </div>
                                </div>
                            )}
                        
                        <div> 
                        <div key={post._id} className="NewRectangle1a">
                        <BsThreeDotsVertical className="Edit" onClick={()=>Navigate(`/UpdateBlog/${post._id}`)}></BsThreeDotsVertical>

                            <img  className="Newimg2" src={`http://localhost:5000/${post.image}`} alt="Image" onClick={()=> handleContent(post._id)}></img>
                            <h3 className="Newp1">{post.Title}</h3><br />
                            <span className="Newp">{post.Description}</span><hr className="NewLine"></hr>
                            <img className="Newimg3" src={profilePic2} alt="Profile" />
                            <span className="Body-UserName">Dasteen</span>
                            <span className="NewDate">{currentDate}</span>
                            {Like[post._id] ? (
                                <FaHeart
                                    className="Like"
                                    onClick={() => like(post._id)}
                                />
                            ) : (
                                <FaRegHeart
                                    className="NewLike"
                                    onClick={() => like(post._id)}
                                />
                            )}
    
                            <FaComment className="NewComment" onClick={() => DisplayPopUp(post._id)}></FaComment>
                            <span className="NewCommentCount">12</span>
    
                            <MdDelete
                                className="Delete"
                                onClick={() => handleDelete(post._id)}
                            />
                        </div>
                        </div>
                        </>
                    );
                })
            }
            </div>
        </>
    );
    


};
export default Body2;




