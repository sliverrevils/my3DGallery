import { Navigate, Route, Routes } from "react-router-dom";
import { authRoutes, questRoutes } from "./accessPaths";
import {getAuth,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';
import {  useRef } from "react";

import {useAuthState} from 'react-firebase-hooks/auth';
import Authification from "../components/Authification";
import ViewItem from "../components/Items/ViewItem";
import TestPage from "../pages/testPage";
import ViewItem2 from "../components/Items/ViewItem2";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function RouteControl() {
  const authRef=useRef(getAuth());
  const [user]=useAuthState(authRef.current);

  const {case:basket}=useSelector(({basket})=>basket)
  useEffect(()=>{
    if(basket){
      console.log('BASKET SAVE',basket);
      localStorage.setItem('basket',JSON.stringify(basket))
    }
  },[basket])

 
  return (
    <>
      <Authification/>      
      <Routes>       
        {(user?authRoutes:questRoutes).map(el=><Route key={Math.random()} {...el}/>)}
        
             
        <Route path="/item/:itemId" element={<ViewItem2/>}/>        
        {/* <Route path="/item/:itemId" element={<ViewItem/>}/>         */}
        <Route path='/test' element={<TestPage/>}/> 
        
        <Route path="*" element={<Navigate to={'/'} replace/>}/>
      </Routes>   
    </>
  );
}

export default RouteControl;
