import './App.css'
import Header from './components/Header'
import Cursor from './components/Cursor'
import { useRef } from 'react'
function App() {
  const stickyElement = useRef(null)

  return (
    <div  >
      <Header ref={stickyElement} />
      <Cursor stickyElement={stickyElement} />
    </div>
  )
}

export default App
