import React,{useContext} from 'react'
import logo from '../img/blanco y negro logo.png'
import {BiBell,BiLogOut,BiUser,BiMessage,BiMap} from 'react-icons/bi'
import {useNavigate } from 'react-router-dom'
import {Contexts} from './../context/Contexts'

function Navbar( {dato}){
  const {setlogged} = useContext(Contexts)
  const navigate = useNavigate();
  return (
    <nav className="bg-color-barra items-center">
      <div className="flex items-center justify-around h-14"> 
        <div className="flex items-center gap-14 z-40 p-5 md:w-auto w-full ">
        <button onClick={()=>navigate('/principal')}>
        <img src={logo} alt="logo" className="md:block hidden h-11 "/>
        </button>
        </div>

        <ul className="md:flex hidden items-center gap-10 ">
          <li>
          <button onClick={()=>navigate('/pacientes')} className="inline-block" disabled={dato}>
          <BiUser size={35} ></BiUser>
          </button>
          </li>
          <li>
          <button onClick={()=>navigate('/mensajes')} className="inline-block" disabled={dato}>
          <BiMessage size={35}></BiMessage>
          </button>
          </li>
          <li>
          <button onClick={()=>navigate('/notificaciones')} className="inline-block" disabled={dato}>
          <BiBell size={35}></BiBell>
          </button>
          </li>
          <li>
          <button onClick={()=>navigate('/infectados')} className="inline-block" disabled={dato}>
          <BiMap size={35}></BiMap>
          </button>
          </li>
        </ul>
        <div className="md:block hidden">
          <button onClick={()=>{setlogged(false);navigate('/')}} className="inline-block">
          <BiLogOut size={35}></BiLogOut>
          </button>
        </div> 
      </div>
    </nav>
  )
}

export default Navbar