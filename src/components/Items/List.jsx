
import {useCollection} from 'react-firebase-hooks/firestore';
import {collection,getFirestore} from 'firebase/firestore'
import { fireApp } from '../../firebase/firebase';
import Item from './Item';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
export default function List(){
    
    const {search,filters}=useSelector(state=>state.filter);
    const [array,setArray]=useState([]);
    const [filtered,setFiltered]=useState([]);

    //GET FIRESTORE
    const [value,loading,error]=useCollection(
        collection(getFirestore(fireApp),'furniture'),
        {snapshotListenOptions:{includeMetadataChanges:true}}
        );  
    //FIRESTORE TO ARRAY
    useEffect(()=>value&&setArray(value.docs.map(el=>({...el.data(),id:el.id}))),[value]);      

    //APPLY FILTERS
    const filter=()=>{
        let arr=[...array];
        Object.keys(filters).forEach(filter=>arr=arr.filter(el=>el[filter]==filters[filter]));        
        return arr.filter(el=>el.name.toLowerCase().includes(search.toLowerCase()));
    }
    
    useEffect(()=>{value&&console.log('META',value.docs[0].data())},[value]) //SHOW META DATA
    return(
        <div className="List">
            {error&&<h1>ERROR !</h1>}
            {loading&&<h1>Loading🚭</h1>}
            {filter().map(el=><Item key={el.id} {...el}/>)||<h1>No data</h1>}
        </div>
    )
}