
/*
 Если не указан размер (size), то будет адаптиветь по размеру родителя 
 В model указывать имя род-папки в "public/models"  , файл в ней должен называться scene.gltf

    <div>
               <div className="Three_parent">
               <Three {...{name:'pool_ball',control:false,rotateSpeed:1,scale:2}}/>
               </div>           
    </div>
 */


import * as THREE from 'three';
import { OrbitControls } from '../../ThreeJs/OrbitControls';
import { GLTFLoader } from '../../ThreeJs/GLTFLoader';
import { useRef } from 'react';
import { useEffect } from 'react';


import { useState } from 'react';

export default function Three({    
    name:filePathProp='pool_ball', // указывать имя папки с файлом scene.gltf в  "public/models"
    grid:gridProp=false,// сетка 
    scale:scaleProp=1,// размер модели в конвасе
    control:controlProp=true,// возможность управления 3д
    size:sizeProp=null,//размеры блока, если не указывать будет адаптивить по размерам родителя 
    interfere:interfereProp=true,//скрывать соседей при контакте с 3д
    light:lightProp=['white',3],//свет [цвет , интенсивность]
    rotateSpeed:rotateSpeedProp=1}){ //скорость автопрокрутки
    
    const [loading,setLoading]=useState(true);
    const parent=useRef();
    const compRefs=useRef({isRender:true,scene:null,camera:null,light:null,renderer:null,control:null,loader:null});

    function init3D(){
       
        //console.log('INIT 3D');       
        const comp=compRefs.current;    

        //----------- GET & SET  RECT !  
        let width,height;
        
        !sizeProp
        ?({width,height}=parent.current.parentElement.getBoundingClientRect())
        :([width,height]=sizeProp);        

        //--CLEAR PREVENT CANVAS 
        if(comp.renderer){
            comp.renderer.domElement.parentElement?.removeChild(comp.renderer.domElement);
            comp.renderer.dispose();
            comp.isRender=true;
        }

        //--SCENE
        comp.scene = new THREE.Scene();

        //--CAMERA
        comp.camera= new THREE.PerspectiveCamera(45,width/height,1,1000);
        comp.camera.position.set(0,2,7);
        comp.camera.lookAt(0,0,0);

        //--LIGHT
        // comp.light=new THREE.DirectionalLight('white',1);
        // comp.light.position.set(12,12,12);
        // comp.light.castShadow=true;
        // comp.scene.add(comp.light);

        comp.light = new THREE.AmbientLight(...lightProp);
        comp.scene.add(comp.light);
        
        //--RENDERER
        comp.renderer=new THREE.WebGL1Renderer({antialias:true,alpha:true});
        comp.renderer.setSize(width,height);

        //--CONTROL
        comp.control = new OrbitControls(comp.camera,comp.renderer.domElement);
        comp.control.mouseButtons={
            LEFT: THREE.MOUSE.ROTATE,
	        //MIDDLE: THREE.MOUSE.DOLLY,
	        RIGHT: THREE.MOUSE.DOLLY
        }
        comp.control.zoomSpeed=1;
        comp.control.enabled=controlProp;
        comp.control.maxDistance=110;
        comp.control.minDistance=2.2;
        if(rotateSpeedProp){
            comp.control.autoRotate=true;
            comp.control.autoRotateSpeed=rotateSpeedProp;
        }
        //---WHEN TOUCH 3D 
        //hide elements 
        const notInterfere=(bool)=>interfereProp&&Array.from(parent.current.parentElement.children).forEach(el=>el!=parent.current&&(el.style.opacity=bool?.06:1));    
        //set events
       
        comp.control.addEventListener('start',()=>notInterfere(true));        
        comp.control.addEventListener('end',()=>{
            comp.control.autoRotateSpeed=false;
            notInterfere(false);
        })        
       
             //--ADD TO DIV
             parent.current.appendChild(comp.renderer.domElement);
    

        //--SHOW GRID?      
        gridProp&&comp.scene.add(new THREE.GridHelper(10,10));
        
        //--LOADER
        comp.loader=new GLTFLoader();
        comp.loader.load(process.env.PUBLIC_URL+'/models/'+filePathProp+'/scene.gltf',(gltf)=>{
            comp.scene.add(gltf.scene);
            //console.log('GLTF',gltf.scene)
            //console.log('SCENE',comp.scene)
            const loadedModel=gltf.scene.children[0];
            //console.log(`LOADED MODEL : `,{loadedModel});
            loadedModel.position.set(0,0,0);
            loadedModel.scale.set(scaleProp,scaleProp,scaleProp);
            setLoading(false);
           
            render();
        })

        function render(){
            comp.renderer.render(comp.scene,comp.camera);
            comp.scene.add(comp.light);
            comp.control.update();
           // //console.log(`RENDER3D`);
            comp.isRender && requestAnimationFrame(render);
        }      

    }

    //-- DID MOUNT
    useEffect(()=>{

        init3D();
      //OBSERVE SIZES
        const resizeObserve=new ResizeObserver(event=>{
            const {width,height}=event[0].contentRect
            resize(width||200,height||200);
        });
        !sizeProp&&resizeObserve.observe(parent.current.parentElement);     

        function resize(width,height){    
           
            compRefs.current.renderer.setSize(width,height);
            compRefs.current.camera.aspect=width/height;  
            compRefs.current.camera.updateProjectionMatrix();
        }

        //-- UNMOUNT
        return ()=>{
        //console.log('remove listener');
        compRefs.current.isRender=false;       
        !sizeProp&&resizeObserve.disconnect();      
        }
    },[])
    return(
        <>
        {loading&&<div style={{position:'absolute',left:'50%',top:'50%',transform:'translateX(-50%)',fontSize:40,fontWeight:700}}>LOADING 3D</div>}

        <div ref={parent} className='canvas_div' hidden={loading}></div>
        </>
        
        
    )
}