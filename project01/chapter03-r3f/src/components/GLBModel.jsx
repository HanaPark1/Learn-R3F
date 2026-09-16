import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

export const GLBModel = () => {
    const three = useThree();
    console.log("three",three);
    const {scene, animations} = useGLTF("/dancer.glb");
    const ref = useRef(null);

    const { actions } = useAnimations(animations, ref);
    console.log(actions);

    useEffect(()=>{
        scene.traverse((obj) => {
            if(obj.isMesh){
                obj.castShadow = true;
                obj.reciveShadow = true;
            }
        });

        actions["wave"].play();
    }, [actions, scene]);

    useFrame((state, delta)=>{
    });

    return <primitive scale={0.01} 
    object={scene}
    position-y={0.8}
    />;
    // primitive: 오브젝트에 지오메트리, 모델링 된 에셋을 넣어 주면 메쉬로 만들어 줌

}