import { createSlice } from "@reduxjs/toolkit";

const initialState={
    email:null,
    displayName:null,
    uid:null,
    accessToken:null,
    photoUrl:null
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            const { email,displayName,uid,accessToken,photoUrl}=action.payload;
            console.log('REDUX',{email,displayName,uid,accessToken,photoUrl});
            return {email,displayName,uid,accessToken,photoUrl};
        },
        dropUser:(state)=>({...initialState})
    }
});


export const {reducer:userReducer,actions:{dropUser,setUser}}=userSlice;