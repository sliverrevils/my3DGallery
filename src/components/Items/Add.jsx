
import {addDoc, collection, getFirestore} from 'firebase/firestore';
import { useRef } from 'react';
import { fireApp } from '../../firebase/firebase';
import furSet from '../../furSet.json';

export default function AddItem({showAddToggle}){
    const name=useRef();
    const pic=useRef();
    const about=useRef();
    const model=useRef();
    const price=useRef();
    const categories=useRef();
    const transformations=useRef();
    

    const addItem=()=>{
        if(!name.current.length===0){
            alert('Enter name');
            return;
        }
        addDoc(collection(getFirestore(fireApp),'furniture'),{
            name:name.current.value,
            pic:pic.current.value||null,
            model:model.current.value||null,
            about:about.current.value||null,
            price:price.current.value||null,
            categories:categories.current.value||null,
            transformations:transformations.current.value||null,


        });
        showAddToggle();
    }

    const clickOnBlack=event=>{        
        event.preventDefault();        
        event.target.classList.contains('Black-screen')&&showAddToggle()
    }


    return(
        <div className='Black-screen' onClick={clickOnBlack}>
        <div className="Add-item">
            
                <h2>add item</h2> 
                <input type={'text'} placeholder='name' ref={name}/>   
                <input type={'text'} placeholder='pic src' ref={pic}/>                  
                <input type={'url'} placeholder='3D-Model link' ref={model}/>  
                <input type={'number'} placeholder='price' ref={price}/>   
                <select ref={categories} >{furSet.props.categories.map(el=><option key={el+Date.now()}>{el}</option>) }</select>    
                <select ref={transformations}>{furSet.props.transformations.map(el=><option key={el+Date.now()} >{el}</option>)}</select>        
                <textarea placeholder="about" ref={about}/>
                <button onClick={addItem} >Add item</button>
        </div>
        </div>
    )
}