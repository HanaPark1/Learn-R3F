import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export const GLBModel = () => {
    const {scene} = useGLTF("/dancer.glb");

    useEffect(()=>{
        scene.traverse((obj) => {
            if(obj.isMesh){
                obj.castShadow = true;
                obj.reciveShadow = true;
            }
        },[scene]);
    })
    
    return <primitive scale={0.01} 
    object={scene}
    position-y={0.8}
    />;
    // primitive: 오브젝트에 지오메트리, 모델링 된 에셋을 넣어 주면 메쉬로 만들어 줌

}