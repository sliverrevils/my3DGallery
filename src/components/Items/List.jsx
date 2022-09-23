
import {useCollection} from 'react-firebase-hooks/firestore';
import {collection,getFirestore} from 'firebase/firestore'
import { fireApp } from '../../firebase/firebase';
import Item from './Item';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
export default function List(){
    
    const {search,filters,sort}=useSelector(state=>state.filter);
    console.log('UPDATE SORT')
    const [array,setArray]=useState([]);
  

    //GET FIRESTORE
    const [value,loading,error]=useCollection(
        collection(getFirestore(fireApp),'models'),
        {snapshotListenOptions:{includeMetadataChanges:true}}
        );  
    //FIRESTORE TO ARRAY
    useEffect(()=>value&&setArray(value.docs.map(el=>({...el.data(),id:el.id}))),[value]);      

    //APPLY FILTERS
    const filter=useMemo(()=>{
        console.log('FILTER')
        let arr=[...array];
        Object.keys(filters).forEach(filter=>arr=arr.filter(el=>el[filter]==filters[filter]));        
        const afterFilters= arr.filter(el=>el.name.toLowerCase().includes(search.toLowerCase()));    

        const afterSort=afterFilters.sort((a,b)=>{
            if(a[sort]&&b[sort]){                
                if(typeof a[sort]=='number'){return b[sort] - a[sort]}
                if(typeof a[sort]=='string')return a[sort].localeCompare(b[sort]);               
            }           
        });
        
        return afterSort;
    },[array,search,filters,sort])
    
   
    return(
        <div className="List">
            {error&&<h1>ERROR !</h1>}
            {loading&&<h1>Loading🚭</h1>}
            {filter.map(el=><Item key={el.id} {...el}/>)}
        </div>
    )
}