import React,{useContext,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Contexts} from './../context/Contexts'
function Principal() {
  const navigate = useNavigate();
  const {user,logged} = useContext(Contexts)
  useEffect(()=>{
    if (!logged) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    
    <div>
    <div className="font-text-welcome py-5 uppercase">Bienvenido Dr. {user.nombres} {user.apellidos}</div>
    </div>
  )
}

export default Principal