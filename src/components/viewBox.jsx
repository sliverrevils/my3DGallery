import { useMemo, useState } from "react";
import { useLoadImage } from "../hooks/hooks";
import Three from "./three/ThreeComp";



export default function ViewBox(props){
    console.log('PROPS',props)
    const [view, setView] = useState(false);// 3d | IMG
    const img = useLoadImage(props.pic);

    const selectedViewShow = useMemo(() => view
        ? <Three {...{ name: props.model, control: true, rotateSpeed: 1, scale: 2, interfere: true }} />
        : img, [view,img]);

    const  chooseView=useMemo(()=><span className="material-icons View__view__changeBtn" onClick={() => setView(state => !state)}>
                            {view ? 'image' : '3d_rotation'}
                            </span>,[view]);

    return (
        <div>
            <div className="View">
                <div className="View__view">
                    
                    <div className="View__addToBasket">{props.basketBtn}</div>
                    <div className="View__name">{props.name}</div>

                    {selectedViewShow}

                    {props.model&&chooseView}

                </div>
                <div className="View__info">
                    <div className="View__info__about">
                        {props.about}
                    </div>
                </div>
            </div>
        </div>
    )
}