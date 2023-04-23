import React,{useContext} from 'react'
import doctoresI from '../img/imgdoctoresNew.png'
import logo from '../img/LogoParaLanding.png'
import { Link,useNavigate } from 'react-router-dom'
import {useState} from 'react'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'


function Login() {
  const navigate = useNavigate();
  const [wronglog, setwronglog] = useState(false); 
  const {setuser,setlogged} = useContext(Contexts) 
  const [loading, setloading] = useState(false);
  const [userLog, setuserLog] = useState({

    correo : '', 
    password_d : '',

  })

  const handleSubmit= async (e) =>{
    e.preventDefault();

    setloading(true);
      const res = await fetch(`${url}/doctores/log`,
      {

          method:'POST',
          headers: {'Content-type':'application/json'},
          body: JSON.stringify(userLog),
      })
      const {status} = await res
      const data = await res.json()
      if (status === 200) {
        setlogged(true);
        let us = {
          dni_d : data.dni_d,
          nombres : data.nombres, 
          apellidos : data.apellidos, 
          fecha_nacimiento : data.fecha_nacimiento, 
          sexo : data.sexo, 
          edad : data.edad, 
          telefono : data.telefono, 
          correo : data.correo, 
          especialidad : data.especialidad, 
          password_d : data.password_d,
        }
        setuser(us);
        navigate('/principal')
      }
      else {
        setwronglog(true)
      }
      setloading(false);

  }

  const handleChange = e=>{
    setuserLog({...userLog,[e.target.name]: e.target.value});
    setwronglog(false)
  }
  return (
    <div className="flex" >
      <div className="bg-gray-100 w-1/2 h-screen flex justify-center flex-col items-center " >
        <img src={doctoresI} alt="doctores" ></img>
        <div className="flex flex-col  max-w-2xl  items-center   text-xl p-10 font-semibold">
        <h1 className="text-justify">
        Disease Safety System te brinda el apoyo necesario para poder controlar a los pacientes que pueden contraer distintas enfermedades infecciosas, 
        como COVID-19 y Viruela del Mono.
        </h1>
        </div>
      </div>
      <div className="bg-white w-1/2 h-screen p-5 items-center">
        <div className="flex flex-col items-center">
          <div>
          <img src={logo} alt="logo" className="w-44 h-44"  ></img>  
          </div>
          <form onSubmit={handleSubmit}> 

            <div className="py-20">
              <h1 className="font-semibold text-xl text-center text-black p-5">Correo</h1>
              <input
                  type="email"
                  className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-10 leading-[1.6] outline-none transition-all duration-200 
                  ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                   dark:placeholder:text-gray-400 [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow text-center "
                  placeholder="Ingresa tu Usuario" name="correo" onChange={handleChange} required/>
              <h1 className="font-semibold text-xl text-center text-black p-5">Contraseña</h1>
              <input
                  type="password"
                  className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-10 leading-[1.6] outline-none transition-all duration-200 
                  ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                   dark:placeholder:text-gray-400  [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow text-center "
                  placeholder="Ingresa tu Contraseña"  name="password_d" onChange={handleChange} required/>
                {
                  !wronglog ?<></>:
                  <h1 className="font-semibold text-lg text-center text-red-600 px-1" >Usuario o Contraseña incorrectos</h1>
                }
            </div>
            <div className="p-2">
              <div className="p-5 flex justify-center flex-col items-center">
                <button type="submit" className="bg-[#1C1B25] hover:bg-[#3693E9] text-white font-bold py-2 px-10 rounded-full" >
                { loading ? "Cargando.." : "Iniciar Sesión" }</button>
              </div>
              <div className="flex justify-center items-center">
                <h1 className="font-semibold text-xl text-center text-black px-1" >¿Necesitas Registrarte?</h1>
                <Link to={"/registrarse/new"} className="font-semibold text-xl text-center text-[#3693E9] px-1 hover:text-blue-600" >Hazlo Aquí</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login