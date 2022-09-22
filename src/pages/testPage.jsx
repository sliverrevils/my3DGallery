import { doc, getFirestore } from "firebase/firestore";
import { useMemo, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import Three from "../components/three/ThreeComp";
import { fireApp } from "../firebase/firebase";
import { useLoadImage } from "../hooks/hooks";



export default function TestPage() {
    const { itemId } = useParams();
    const [value, loading, error] = useDocumentData(doc(getFirestore(fireApp), 'furniture', itemId));

    useEffect(()=>{
        console.log(value);
    },[value])

    //----
    const [view, setView] = useState(true);// 3d | IMG
    const img = useLoadImage('https://i.pinimg.com/originals/6a/49/2d/6a492d794f8011b471ac13fd11dcd1f5.jpg');

    const selectedViewShow = useMemo(() => view
        ? <Three {...{ name: 'pool_ball', control: true, rotateSpeed: 1, scale: 2, interfere: true }} />
        : img, [view])


    return (
        <div>
            <div className="View">
                <div className="View__view">
                    <div className="View__name">Тестовое имя позиции</div>
                    {selectedViewShow}
                    <span className="material-icons View__view__changeBtn" onClick={() => setView(state => !state)}>
                        {view ? 'image' : '3d_rotation'}
                    </span>

                </div>
                <div className="View__info">
                    <div className="View__info__about">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum illum nam delectus dolorem ipsam nesciunt voluptatem error et iusto labore eum, animi, harum reprehenderit commodi voluptatibus quam officiis iste. A.
                    </div>
                </div>
            </div>
        </div>
    )
}