import { Canvas } from '@react-three/fiber'
import Scene from './Scene.jsx'

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <Scene />
    </Canvas>
  )
}