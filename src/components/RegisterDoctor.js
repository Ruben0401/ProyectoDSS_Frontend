import React from 'react'
import doctoresI from '../img/imgdoctoresNew.png'
import logo from '../img/LogoParaLanding.png'
import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import {url} from '../config/config'

function RegisterDoctor() {
  const navigate=useNavigate();
  const [wronglog, setwronglog] = useState(false);
  const [errortxt, seterrortxt] = useState();
  const [loading, setloading] = useState(false);
  const [doctor, setdoctor] = useState({

    dni_d : '',
    nombres : '', 
    apellidos : '', 
    fecha_nacimiento : '', 
    sexo : '', 
    edad : '', 
    telefono : '', 
    correo : '', 
    especialidad : '', 
    password_d : '',

  })

  const handleSubmit= async (e) =>{
    e.preventDefault();

    setloading(true);
    const resemail = await fetch(`${url}/doctores/email`,
    {
        method:'POST',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify(doctor),
    })
    const {status}=resemail
    if (status===200) {
      seterrortxt('Correo electrónico ya existe')
      setwronglog(true);
    } else {
      const res = await fetch(`${url}/doctores`,
      {
          method:'POST',
          headers: {'Content-type':'application/json'},
          body: JSON.stringify(doctor),
      })
      const data = await res.json()
      if (data.message) {
        seterrortxt('DNI ya existe')
        setwronglog(true);
      }
      else{
        navigate('/')
      }
    }
    setloading(false);
    

  }

  const handleChange = e=>{
    setdoctor({...doctor,[e.target.name]: e.target.value});
    setwronglog(false)
  }

  return (
    <div className="flex" >
    <div className="bg-gray-100 w-1/2 h-screen max-h-screen flex justify-center flex-col items-center " >
      <img src={doctoresI} alt="doctores" ></img>
      <div className="flex flex-col  max-w-2xl  items-center   text-xl p-10 font-semibold">
      <h1 className="text-justify">
      Disease Safety System te brinda el apoyo necesario para poder controlar a los pacientes que pueden contraer distintas enfermedades infecciosas, 
      como COVID-19 y Viruela del Mono.
      </h1>
      </div>
    </div>
    <div className="bg-white w-1/2 h-screen p-5 items-center">
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center px-48">
        <img src={logo} alt="logo" className="h-20" ></img>
          <div className="py-2">
            <div className="p-2">
              <h1 className="font-semibold text-base text-center text-black ">DNI</h1>
              <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-20 leading-[1.6] outline-none transition-all duration-200 
                  ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                   dark:placeholder:text-gray-400 [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow text-center "
                  placeholder="Ingresa tu DNI" name="dni_d" onChange={handleChange} required />
            </div>
            <div className="flex">
              <div className="p-2">
                <h1 className="font-semibold text-base text-center text-black ">Nombres</h1>
                <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-14 leading-[1.6] outline-none transition-all duration-200 
                    ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                     dark:placeholder:text-gray-400 [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow text-center "
                    placeholder="Ingresa aquí" name="nombres" onChange={handleChange} required/>
              </div>
              <div className="p-2">
                <h1 className="font-semibold text-base text-center text-black ">Apellidos</h1>
                <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-14 leading-[1.6] outline-none transition-all duration-200 
                    ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                     dark:placeholder:text-gray-400 [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow text-center "
                    placeholder="Ingresa aquí" name="apellidos" onChange={handleChange} required />
              </div>
            </div>
            <div className="p-2">
              <h1 className="font-semibold text-base text-center text-black ">Fecha de Nacimiento</h1>
              <input type="date" 
                  className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-20 leading-[1.6] outline-none transition-all duration-200 
                  ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                dark:placeholder:text-gray-400 [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow text-center " 
                  name="fecha_nacimiento" onChange={handleChange} required
               ></input>
            </div>
            <div className="p-2">
              <h1 className="font-semibold text-base text-center text-black ">Genero</h1>
                  <select className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                  ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow" required
                  name="sexo" onChange={handleChange}
                  >
                    <option value=""> -- Selecciona un Genero -- </option>
                    <option value={'Femenino'}>Femenino</option>
                    <option value={'Masculino'}>Masculino</option>
                  </select>
            </div>
            <div className="p-2">
              <h1 className="font-semibold text-base text-center text-black ">Edad</h1>
              <input
                  type="number"
                  className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-20 leading-[1.6] outline-none transition-all duration-200 
                  ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                   dark:placeholder:text-gray-400 [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow text-center "
                  placeholder="Ingresa tu edad"  name="edad" onChange={handleChange} required/>
            </div>
            <div className="p-2">
              <h1 className="font-semibold text-base text-center text-black ">Telefono</h1>
              <input
                  type="tel"
                  className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-20 leading-[1.6] outline-none transition-all duration-200 
                  ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                   dark:placeholder:text-gray-400 [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow text-center "
                  placeholder="Ingresa tu Telefono"  name="telefono" onChange={handleChange} required/>
            </div>
            <div className="p-2">
              <h1 className="font-semibold text-base text-center text-black ">Correo</h1>
              <input
                  type="email"
                  className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-20 leading-[1.6] outline-none transition-all duration-200 
                  ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                   dark:placeholder:text-gray-400 [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow text-center "
                  placeholder="Ingresa tu correo" name="correo" onChange={handleChange} required />
            </div>
            <div className="p-2">
              <h1 className="font-semibold text-base text-center text-black ">Especialidad</h1>
              <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-20 leading-[1.6] outline-none transition-all duration-200 
                  ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                   dark:placeholder:text-gray-400 [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow text-center "
                  placeholder="Ingresa tu Especialidad"  name="especialidad" onChange={handleChange} required/>
            </div>
            <div className="p-2">
              <h1 className="font-semibold text-base text-center text-black ">Contraseña</h1>
              <input
                  type="password"
                  className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-20 leading-[1.6] outline-none transition-all duration-200 
                  ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                   dark:placeholder:text-gray-400 [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow text-center "
                  placeholder="Ingresa tu Contraseña"  name="password_d" onChange={handleChange} required/>
            </div>
            <div className="px-3 items-center text-center">
            <label className="font-semibold text-base text-center text-black ">
              <input type="checkbox" name="check" className="accent-blue-400 " required/> Acepto los Términos y Condiciones
            </label>
            </div>
            {
             !wronglog ?<></>:
              <h1 className="font-semibold text-base text-center text-red-600 px-1" >{errortxt}</h1>
            }
          </div>
          <div className="p-2 flex">
            <div className="p-1 flex justify-center flex-col items-center px-20">
              <button type="submit" className="bg-[#1C1B25] hover:bg-[#3693E9] text-white font-bold py-2 px-10 rounded-full disabled:bg-gray-400" 
                disabled={!doctor.apellidos || !doctor.correo || !doctor.dni_d || !doctor.edad || !doctor.especialidad || !doctor.fecha_nacimiento
                || !doctor.nombres || !doctor.password_d || !doctor.sexo || !doctor.telefono }>
              { loading ? "Cargando.." : "Registrarse" }</button>
            </div>
            <div className="p-1 flex justify-center flex-col items-center px-20">
              <button type="button" className="bg-[#1C1B25] hover:bg-[#3693E9] text-white font-bold py-2 px-10 rounded-full" onClick={()=>navigate('/')} >Cancelar</button>
            </div>
          </div>
      </div>
    </form>
    </div>
  </div>
  )
}

export default RegisterDoctor