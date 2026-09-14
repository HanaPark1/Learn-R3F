import { FirstPersonControls, FlyControls, OrbitControls, PointerLockControls, TrackballControls } from "@react-three/drei"

export const Controls = () => {
    return (
        // <OrbitControls enableDamping 
        // dampingFactor={0.03}
        // enableZoom
        // enablePan
        // // autoRotate (자동 회전)
        // // autoRotateSpeed={1} (회전 속도)
        // maxPolarAngle={Math.PI/2} // 카메라 앵글 제한 (바닥면까지)
        // minPolarAngle={Math.PI/4}
        // maxAzimuthAngle={Math.PI / 2}
        // minAzimuthAngle={-Math.PI / 2} // 수평 회전
        // />;
        // <FlyControls 
        // movementSpeed={1}
        // rollSpeed={Math.PI/20}
        // autoForward={false} // 빙글빙글 돈다 
        // />
        // <FirstPersonControls
        // lookSpeed={0.1}
        // movementSpeed={1}
        // lookVertical={false} // 마우스로 회전 
        // />
        // <PointerLockControls/> // 클릭 시 마우스로 시점 확인 가능 esc로 빠져나오기
        <TrackballControls
        rotateSpeed={2}
        zoomSpeed={1.5}
        panSpeed={0.5} // 카메라 시점 이동 속도
        noRotate={false}
        noZoom={false}
        noPan={false}
        staticMoving={false} // 댐핑 유무
        dynamicDampingFactor={0.5}
        />
    )
        
}