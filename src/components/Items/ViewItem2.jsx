import { doc, getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fireApp } from "../../firebase/firebase";
import { useBasketBtn } from "../../hooks/hooks";
import { ToMainBtn } from "../../ui/buttons";
import BasketCase from "../basket/BasketList";
import Footer from "../html/Footer";
import ViewBox from "../viewBox";



export default function ViewItem2() {

    const basket = useSelector(state=>state.basket.case);
    const { itemId } = useParams();
    const [value, loading, error] = useDocumentData(doc(getFirestore(fireApp), 'models', itemId));

    const { basketBtn } = useBasketBtn(itemId)

    useEffect(() => console.log(value), [value]);
    return (
        <div className="View2">
            <div className="View2__buttons">
                {<ToMainBtn text="Вернуться к списку" />}
                
            </div>

            {loading && <h1>LOADING</h1>}
            {value && <ViewBox {...{...value,basketBtn}} />}
           {basket.length>0&&<div className="View2__basket">
                <BasketCase />               
            </div>}

        </div>
    )
}