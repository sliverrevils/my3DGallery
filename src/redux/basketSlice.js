import { createSlice } from "@reduxjs/toolkit";

const initialState={
    case:JSON.parse(localStorage.getItem('basket'))||[]
};

const basketSlice=createSlice({
    name:'basket',
    initialState,
    reducers:{
        addToBasket:(state,action)=>{state.case.push(action.payload)},
        removeFromBasket:(state,action)=>{state.case.splice(state.case.findIndex(el=>el===action.payload),1)},
        clearBasket:(state)=>{state=initialState},
        itemBasketToggle:(state,action)=>{state.case.includes(action.payload)?state.case.splice(state.case.findIndex(el=>el===action.payload),1):state.case.push(action.payload)}
    }
});

export const {reducer:basketReducer,actions:{addToBasket,clearBasket,removeFromBasket,itemBasketToggle}}=basketSlice;