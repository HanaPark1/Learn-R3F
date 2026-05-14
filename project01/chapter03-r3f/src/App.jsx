import { useState } from 'react'
import { MainCanvas } from "./components/MainCanvas"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{width: "100vw", height: "100vh"}}>
      <MainCanvas />
    </div>
  )
}

export default App
