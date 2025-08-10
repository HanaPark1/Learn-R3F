import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
// OrbitControls : 마우스 드래그로 모델 회전 가능
import Model from './Scene.jsx'

export default function App() {
  return (
    //  camera={{ position: [0, 5, 10], fov: 80 }} → x=0, y=5, z=10 위치에 카메라가 있음
    //fov는 카메라 시야각(Field of View)으로 숫자가 클수록 더 넓은 범위가 보임
    // ambientLight :씬 전체에 균일하게 퍼지는 전역 조명
    // directionalLight: 태양빛처럼 한 방향에서 평행하게 들어오는 빛
    // x=5, y=5, z=5 위치에서 빛이 와서 씬을 비춤.
    <Canvas style={{ width: '100%', height: '500px' }}  camera={{ position: [0, 5, 10], fov: 80 }}>

      <ambientLight intensity={0.5} />
      {/* <directionalLight position={[5, 5, 5]} /> */}
      <directionalLight position={[1, 1, 1]} />
      
      <Model/>

      <OrbitControls />
    </Canvas>
  )
}
