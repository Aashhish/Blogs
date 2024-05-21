// import { createSlice } from "@reduxjs/toolkit"
// import { getPost } from "../Actions/Blog"

// const initialState={
//   posts:[],
//   loading:false,
//   error:null
// }

// export const postSlice=createSlice({
//   name:'postSlice',
//   initialState,
//   reducers:{},
//   extraReducers:(builder)=>{
//     builder.addCase(getPost.pending,(state)=>{
//       state.loading=true
//     });
//     builder.addCase(getPost.fulfilled,(state,action)=>{
//       state.loading=false
//       state.posts=action.payload
//     });
//     builder.addCase(getPost.rejected,(state,action)=>{
//       state.loading=false
//       state.error=action.payload
//     });
//   }
// })