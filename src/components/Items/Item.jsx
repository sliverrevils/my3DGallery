import { nanoid } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { deleteDoc, doc,getFirestore } from "firebase/firestore";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate } from "react-router-dom";
import { fireApp } from "../../firebase/firebase";
import { useBasketBtn } from "../../hooks/hooks";


export default function Item({id,pic,about,name}){
    
    const [user]=useAuthState(getAuth());
    const {basketBtn}=useBasketBtn(id);
  
    const onDelDoc=async()=>{        
        const res=window.confirm('Delete item ⁉️');
        if(res){
        await deleteDoc(doc(getFirestore(fireApp),'furniture',id));
        alert(`${id} - was deleted ! ❌`);
        }        
    }

    const [img,setImg]=useState("https://tatarstan-symphony.com/images/noimage.jpg");

    const loadImg=async(src)=>{
        if(src){
        const img=new Image();
        img.src=src;
        img.onload=()=>setImg(img.src);
        } 
    }

    const showAbout=useCallback(()=>{
        if(about.length>50){
            console.log('BIG');
            return about.substr(0,100)+'...'
        }
        return about;
        
    },[about])

    const openView=()=>{
        Navigate({to:`/item/${id}`,replace:true});
    }

    useEffect(()=>{
        loadImg(pic)
    },[]);


    return(
        <article className="Item" >  
        <div className="Item__btn">
        {user
        ?<span onClick={onDelDoc} >❌</span>
        :basketBtn
        } 

        </div>                  
            <Link to={`/item/${id}`} ><img className={"Item__img"} src={img} alt='img' /></Link>            
            <span className={"Item__name"}>{name}</span>
            <p className={"Item__about"}><b>About:</b> <i>{showAbout()}</i></p>
            
        </article>
    )
}

