import { doc,getFirestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux"
import { fireApp } from "../../firebase/firebase";
import BasketItem from "./BasketItem";



export default function BasketCase(){
    const basket=useSelector(state=>state.basket.case);
    
    return(
        <div className="Basket">
            {basket.length>0&&<span className="material-icons Basket__ico">shopping_cart</span>}
            {basket.map(el=><BasketItem key={el} id={el}/>)}            
        </div>
    )
}