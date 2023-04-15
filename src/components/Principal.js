import React from 'react'
import Navbar from './Navbar'
import { useLocation } from 'react-router-dom'
function Principal() {
  const {state:doclog} = useLocation();
  return (
    
    <div><Navbar/>
    <div className="font-text-welcome py-5 uppercase">Bienvenido Dr. {doclog.nombres}</div>
    </div>
  )
}

export default Principal