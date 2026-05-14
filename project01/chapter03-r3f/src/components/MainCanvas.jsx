import { Canvas } from "@react-three/fiber";
import { Color } from "three";

export const MainCanvas = () => {
    return (
        // gl = 끝마무리 처리 완화 (렌더러 대응)
        <Canvas 
        gl={{antialias: true}}
        camera={{
            fov:60,
            aspect: window.innerWidth / window.innerHeight, // 카메라 비율
            near: 0.1,
            far: 100,
            position: [5,5,5], // 5,5,5에 위치하는 카메라
        }}
        scene={{background: new Color(0x000000)}}
        >
            <mesh position={[0,0,0]}>
                <boxGeometry args={[1,1,1]} />
                <meshBasicMaterial color={0xff0000}/>
            </mesh>
        </Canvas>
    );
}