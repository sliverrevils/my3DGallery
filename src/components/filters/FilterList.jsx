import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "../../hooks/hooks";
import {  addSearch, addSort } from "../../redux/filterSlice";
import appSet from '../../appSet.json';
import FilterItem from "./FilterItem";
import { useMemo } from "react";

export default function Filter(){   
    const dispatch= useDispatch();   
    
    //search
    const [search,setSearch]=useState('');  
    const {debounce}=useDebounce(search,300); 
    const onSearch=event=>setSearch(event.target.value);
    useEffect(()=>{dispatch(addSearch(debounce))},[debounce]);
    //sort
    const [sort,setSort]=useState();
    useEffect(()=>{sort&&dispatch(addSort(sort))},[sort]);
    //useEffect(()=>{sort&&dispatch(setSort(sort))},[sort]);

    //list
    const filtersMemo=useMemo(()=>Object.keys(appSet.props).map((name,index)=><FilterItem key={nanoid()} {...{name,index}}/>),[])

    return(
        <div className="Filter">
              <input type={'text'} placeholder='Поиск по имени' value={search} onChange={onSearch}/>
              <select onChange={event=>setSort(event.target.value)}>
                <option value={'date'}>По дате создания</option>
                <option value={'name'}>По имени</option>
              </select>
           {filtersMemo}
        </div>
    )
}

