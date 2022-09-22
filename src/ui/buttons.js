import { Link } from "react-router-dom";


export const ToMainBtn=({text='Go to main'})=><Link to={'/'} className={'btn'} replace>{text}</Link>

export const AddToBasket=()=>{}