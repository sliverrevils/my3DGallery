import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFilter } from "../../redux/filterSlice";
import furSet from '../../furSet.json';

export default function FilterItem({name,index}){
    
    const dispatch= useDispatch(); 
    const [state,setState]=useState();

    const dispatchFilter=()=>dispatch(addFilter({[name]:state}));
    const onChange=(event)=>{setState(event.target.value)}
    useEffect(()=>{dispatchFilter()},[state]);
    return(
        <select {...{onChange}}  value={state}>
        <option value='' > - {furSet.proptext[index]} - </option>
        {furSet.props[name].map(el=><option key={nanoid()} value={el}>{el}</option>)}
        </select>
    )
}