import React from 'react'
import logo from '../img/LogoParaLanding.png'
import {useNavigate} from 'react-router-dom'
function LandingPage() {
  const navigate=useNavigate();
  return (
    <div className="bg-landing h-screen p-5 ">
      <div className=" flex justify-center flex-col items-center">
        <img src={logo} alt="logo" className="h-32 "></img>
        <div className="p-20 flex justify-center flex-col items-center text-center">
        <div className="p-5 flex justify-center flex-col items-center">
        <button className="bg-[#1C1B25] hover:bg-[#3693E9] text-white font-bold py-2 px-10 rounded-full" onClick={()=>navigate("/login")} >Iniciar Sesion</button>
        </div>
        <h3 className="font-semibold text-xl">O</h3>
        <div className="p-5 flex justify-center flex-col items-center">
        <button className="bg-[#1C1B25] hover:bg-[#3693E9] text-white font-bold py-2 px-12 rounded-full" onClick={()=>navigate("/registrarse/new")}>Registrarse</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage