import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../hooks/hooks";
import { addFilter, addSearch } from "../../redux/filterSlice";
import furSet from '../../furSet.json';
import FilterItem from "./FilterItem";
import { useMemo } from "react";

export default function Filter(){   
    const dispatch= useDispatch();   
    
    //search
    const [search,setSearch]=useState('');  
    const {debounce}=useDebounce(search,300); 
    const onSearch=event=>setSearch(event.target.value);
    useEffect(()=>{dispatch(addSearch(debounce))},[debounce]);
    //list
    const filtersMemo=useMemo(()=>Object.keys(furSet.props).map((name,index)=><FilterItem key={nanoid()} {...{name,index}}/>),[])

    return(
        <div className="Filter">
              <input type={'text'} placeholder='Поиск по имени' value={search} onChange={onSearch}/>
           {filtersMemo}

        </div>
    )
}

