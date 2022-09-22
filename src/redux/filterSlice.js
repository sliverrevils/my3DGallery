

import {createSlice} from '@reduxjs/toolkit';

const initialState={
    search:'',
    filters:{},
}

const filterSlice=createSlice({
    name:'filter',
    initialState,
    reducers:{
        addSearch:(state,action)=>{state.search=action.payload},
        addFilter:(state,action)=>{  
            if(Object.values(action.payload)[0])          
            state.filters={...state.filters,...action.payload};
            else
            delete state.filters[Object.keys(action.payload)[0]];            
        },
        clearFilters:(state)=>initialState
    }
})


export const {reducer:filterReducer,actions:{addSearch,clearFilters,addFilter}}=filterSlice;