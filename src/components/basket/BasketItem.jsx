import { doc, getFirestore } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fireApp } from "../../firebase/firebase";
import { useBasketBtn } from "../../hooks/hooks";
import { itemBasketToggle } from "../../redux/basketSlice";

export default function BasketItem({id}){
    const dispatch=useDispatch();    
    const [data,loading,error]=useDocumentData(doc(getFirestore(fireApp),'furniture',id));
    
    const onDelItem=(event)=>{
        event.preventDefault();
        dispatch(itemBasketToggle(id));
    };
    
    return(
        <Link className="Basket__item" to={`/item/${id}`} replace>
            <span className="Basket__item__name">{data?.name}</span>
            <span className="material-icons Basket__item__del" onClick={onDelItem}>highlight_off</span>
        </Link>
    )

}