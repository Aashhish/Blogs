// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { createBlog, getBlog } from "../../API/endpoints";

// export const getPost=createAsyncThunk("post/getPosts",async()=>{
//   try{
//     const response=await getBlog();
//     console.log(response.data);
//     return response.data;
//   }catch(err){
//     console.log(err,'error during fetching post data');
//   }
// })

// export const createPost=createAsyncThunk("post/createPost",async(data)=>{
//   try{
//     const res=await createBlog(data);
//     return res;
//   }catch(err){
//     console.log(err,'error during fetching create post');
//   }
// })