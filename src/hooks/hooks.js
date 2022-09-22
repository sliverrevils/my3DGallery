import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemBasketToggle } from "../redux/basketSlice";

export const useDebounce=(text,delay=400)=>{ 
    const [debounce,setDebounce]=useState(text);

    useEffect(()=>{
        const timeout=setTimeout(()=>setDebounce(text),delay);
        return ()=>clearTimeout(timeout);
    },[text,delay]);
    return {debounce};   
}


export const useBasketBtn=(id)=>{
    const [itemIco,setItemIco]=useState('shopping_cart');//remove_shopping_cart
    const dispatch=useDispatch();    
    const basket=useSelector(state=>state.basket.case);


    const inBasket=()=>setItemIco(basket.includes(id)?'check_box':'add_box');  
    useEffect(()=>{inBasket()},[basket]);

    return {basketBtn:<span className="material-icons"  onClick={()=>dispatch(itemBasketToggle(id))}>{itemIco}</span>}

}



export const useLoadImage=(srcUrl,className="View__view__img",alt='img')=>{
    const baseImg={
        none:'https://www.stephaniemurphyvoice.com/wp-content/uploads/2019/04/gkit_sample_img.jpg',
        loading:'https://i.ytimg.com/vi/KEb8-QbxJEI/maxresdefault.jpg',
        error:'https://miro.medium.com/max/1200/1*RfU65eaT0PhiMwtjVK5GHQ.jpeg'
    }

    
    const [loaded,setLoaded]=useState(baseImg.none);

    useEffect(()=>{
        if(srcUrl){
            console.log('SRC-URL :',srcUrl);
            setLoaded(baseImg.loading);
            const img=new Image();
            img.src=srcUrl;
            img.onload=()=>{setLoaded(img.src)};
            img.onerror=()=>setLoaded(baseImg.error);
        }       
    },[]);

    return <img src={loaded} {...{className,alt}} />
}