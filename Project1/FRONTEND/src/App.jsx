import { useState } from 'react'
import FacialExpression from './components/FacialExpression';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <FacialExpression />
    </>
  )
}

export default App
