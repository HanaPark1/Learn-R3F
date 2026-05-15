import { Plane, TorusKnot } from "@react-three/drei";
import * as THREE from "three";

export const Meshes = () => {
    // 박스 컴포넌트 분리
    return (
        <>
            <Plane args={[40,40]} rotation-x={-Math.PI / 2} receiveShadow>
                <meshStandardMaterial />
            </Plane>

            <TorusKnot
            args={[1,0.2,120,120,2,3]}
            position={[-3,1.6,0]}
            castShadow
            receiveShadow>
                <meshStandardMaterial 
                    color={0xffffff} 
                    roughness={0.5}
                    metalness={1}/>
            </TorusKnot>
        </>
    );
};