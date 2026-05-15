import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"
import { Color } from "three";
import { Meshes } from "./Meshes";

export const MainCanvas = () => {
    return (
        // gl = 끝마무리 처리 완화 (렌더러 대응)
        <Canvas 
        gl={{antialias: true}}
        shadows={"soft"} // 그림자 사용
        camera={{
            fov:60,
            aspect: window.innerWidth / window.innerHeight, // 카메라 비율
            near: 0.1,
            far: 100,
            position: [5,5,5], // 5,5,5에 위치하는 카메라
        }}
        scene={{background: new Color(0x000000)}}
        >
            <OrbitControls />
            <directionalLight 
                castShadow
                args={[0xffffff, 5]}
                position={[4,4,4]}
                shadow-camera-left={-25}
                shadow-camera-right={25}
                shadow-camera-top={25}
                shadow-camera-bottom={-25}
                shadow-camera-near={0.1}
                shadow-camera-far={1000}
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
            />
            <Meshes/>
        </Canvas>
    );
}