import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Welcome from './components/Welcome'
import SignUp from './components/SignUp'
import { Route,Routes,Router } from 'react-router-dom'
import Login from './components/Login'
import HomePage from './components/HomePage'
import { AuthProvider } from './components/AuthContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
    <Routes>
        <Route path="/" element={<Welcome></Welcome>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
    </AuthProvider>

   
    
    
      
    </>
  )
}

export default App
