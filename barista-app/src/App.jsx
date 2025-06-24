import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import BaristaForm from './components/BaristaForm';

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <div className='title-container'> 
        <h1 className='title'> On My Grind </h1>
        <p> so you think you can barista? lets's test that...</p>
      </div>
      
      <BaristaForm />
    </div>
  )
}

export default App
