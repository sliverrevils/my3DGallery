
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import {filterReducer} from './filterSlice';
import { basketReducer } from "./basketSlice";

export const store = configureStore({
    reducer:{
        user:userReducer,
        filter:filterReducer,
        basket:basketReducer
    },
    devTools:process.env.NODE_ENV!=='production'
})