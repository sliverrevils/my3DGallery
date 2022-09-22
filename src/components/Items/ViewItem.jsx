
import { useDocument, useDocumentData } from 'react-firebase-hooks/firestore';
import { doc, getFirestore } from 'firebase/firestore';
import { fireApp } from '../../firebase/firebase';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import * as THREE from 'three';
import { OrbitControls } from '../../ThreeJs/OrbitControls';
import { GLTFLoader } from '../../ThreeJs/GLTFLoader';



import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, itemBasketToggle } from '../../redux/basketSlice';
import { useBasketBtn } from '../../hooks/hooks';


import myLight from '../../models/light/light.gltf';




export default function ViewItem() {
    const { itemId } = useParams();
    const [value, loading, error] = useDocumentData(doc(getFirestore(fireApp), 'furniture', itemId));
    const win3Dref = useRef(null);
    const rendererRef = useRef(null);
    const cameraRef = useRef(null);
    const render3dRef = useRef(true);


    const { basketBtn } = useBasketBtn(itemId);


    const init3D = () => {
        console.log('INIT 3D');
        const { width, height } = win3Dref.current?.getBoundingClientRect();// get window sizes
        //clear old canvas
        if (rendererRef.current) {
            rendererRef.current.domElement.parentElement?.removeChild(rendererRef.current.domElement);
            rendererRef.current.dispose();
        }
        //scene
        const scene = new THREE.Scene();
        //camera
        cameraRef.current = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
        cameraRef.current.position.set(0, 2, 7);
        cameraRef.current.lookAt(0, 0, 0);
        //light
        const light = new THREE.DirectionalLight('white', 3);
        light.position.set(12, 12, 12);
        light.castShadow = true;
        scene.add(light);

        const light2 = new THREE.DirectionalLight('white', 3);
        light2.position.set(-12, -12, -12);
        light2.castShadow = true;
        scene.add(light2);

        // const light2= new THREE.AmbientLight('white',1);
        // scene.add(light2);
        //renderer
        rendererRef.current = new THREE.WebGL1Renderer({ antialias: true, alpha: true });
        rendererRef.current.setSize(width, height);
        
        //control
        const control = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
        control.maxDistance = 110;
        control.minDistance = 2.2;
        control.autoRotate = true;
        control.autoRotateSpeed = .5;

        //add to DIV
        win3Dref.current.appendChild(rendererRef.current.domElement);

        //add grid
        //scene.add(new THREE.GridHelper(10, 10));

        //loader
        const loader = new GLTFLoader();
        loader.load(myLight, (gltf) => {
            scene.add(gltf.scene);
            const model = gltf.scene.children[0];
            console.log('MODEL', gltf.scene.children[0]);
            model.position.set(0, 0, 0);
            model.scale.set(0, 0, 0);
            render();
        })
        //render();

        //render
        function render() {
            rendererRef.current.render(scene, cameraRef.current);
            scene.add(light, light2);
            control.update();
            console.log('RENDER 3d');
            render3dRef.current && requestAnimationFrame(render);
        }
    }

    useEffect(() => {
        function resize() {
            const { width, height } = win3Dref.current?.getBoundingClientRect();// get window sizes
            console.log('RESIZE');
            rendererRef.current.setSize(width, height);
            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
        }
        if (!loading && value?.model) {
            render3dRef.current = true;
            window.addEventListener('resize', resize);
            init3D();
        }
        return () => {
            render3dRef.current = false;
            window.removeEventListener('resize', resize)
        };
    }, [loading]);

    return (
        <div >
            <Link to={'/'} className='backBtn'>Go back
                <i className="material-icons">reply</i></Link>
            {error && <h1>Error 🆘</h1>}
            {loading && <h1>Loading🚭</h1>}
            {value && <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='View-item'>
                    <span className='View-item__id'>id : {itemId}</span>
                    <h2 className='View-item__name'>{value.name}</h2>
                    {value?.model
                        ? <div className='View-item__3d' ref={win3Dref}></div>
                        : <img className='View-item__pic' src={value.pic} alt={value.name} />}
                    <h3>{value.about}</h3>
                    {value.price && <div className="View-item__price">Цена: {value.price || 'уточняйте у консультанта'}</div>}
                    {value.transformation && <div className="View-item__transform">Механизм трансформации: {value.transformation}</div>}


                    {basketBtn}
                </div>
            </div>}


        </div>
    )
}