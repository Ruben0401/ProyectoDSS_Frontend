import React,{useContext} from 'react'
import {BiUser} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import { useNavigate,useParams } from 'react-router-dom'
import {useState,useEffect} from 'react'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'

function PatientForm() {
    const {logged} = useContext(Contexts)
    const navigate=useNavigate();
    const params = useParams();
    const [loading, setloading] = useState(false);
    const [editing, setediting] = useState(false);
    const [patient, setpatient] = useState({

      dni_p : '',
      nombres : '', 
      apellidos : '', 
      fecha_nacimiento : '', 
      sexo : '', 
      edad : '', 
      telefono : '', 
      correo : '', 
      direccion : '', 
      password_p : '',

    }) 

    const handleSubmit= async (e) =>{
      e.preventDefault();

      setloading(true);

      if (editing){
          await fetch(`${url}/pacientes/${params.dni}`,{
              method: "PUT",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify(patient)
          })
      } else{
          await fetch(`${url}/pacientes`,
        {

            method:'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(patient),
        })
      }

        setloading(false);
        navigate('/pacientes')

    }

    const handleChange = e=>{
      setpatient({...patient,[e.target.name]: e.target.value});
    }

    const loadPatient = async(dni)=>{
      const res=await fetch(`${url}/pacientes/${dni}`)
      const data= await res.json()
      setpatient({
        dni_p : data.dni_p,
        nombres : data.nombres, 
        apellidos : data.apellidos, 
        fecha_nacimiento : data.fecha_nacimiento.substring(0, 10), 
        sexo : data.sexo, 
        edad : data.edad, 
        telefono : data.telefono, 
        correo : data.correo, 
        direccion : data.direccion, 
        password_p : data.password_p,
      })
      setediting(true);
    }

    useEffect(()=> {
      if (params.dni) {
        if (!logged) {
          navigate('/')
        }
        else{
          loadPatient(params.dni)
        } 
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[params.dni])

  return (
    <div>
    <div className=" p-5 flex justify-center flex-col items-center">
        <div>
        <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
        <BiUser size={40} color={"#3693E9"} ></BiUser>  
        {editing ? "Modificar Paciente":"Formulario de Paciente"}
        </div>
        <div className="box-table ">
        <form onSubmit={handleSubmit}>
          <div className="p-4 flex justify-center items-center flex-col px-56">
          <CgProfile size={120} color={"#3693E9"} ></CgProfile>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >DNI</h1>
            <div className="relative mb-3 xl:w-96" >
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                  ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                   dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow "
                  placeholder="Coloca tu DNI" name="dni_p" onChange={handleChange} value={patient.dni_p} disabled={editing}/>
            </div>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Nombres</h1>
            <div className="relative mb-3 xl:w-96" >
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                  ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                   dark:placeholder:text-black  [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow "
                  placeholder="Coloca tus Nombres" name="nombres" onChange={handleChange} value={patient.nombres} />
            </div>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Apellidos</h1>
            <div className="relative mb-3 xl:w-96" >
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                    ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                     dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow "
                    placeholder="Coloca tus Apellidos" name="apellidos" onChange={handleChange} value={patient.apellidos}/>
            </div>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Fecha de Nacimiento</h1>
          <input type="date" 
          className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
               dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow" name="fecha_nacimiento" onChange={handleChange}
               value={patient.fecha_nacimiento}
               ></input>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Genero</h1>
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <select className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
               dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow" name="sexo" onChange={handleChange} 
               value={patient.sexo} required
                   >
                  <option value=""> -- Selecciona un Genero -- </option>
                  <option value={'Femenino'}>Femenino</option>
                  <option value={'Masculino'}>Masculino</option>
                </select>
              </div>
            </div>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Edad</h1>
            <div className="flex justify-center">
              <div className="relative mb-3 xl:w-96" >
                <input
                  type="number"
                  className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                  ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow"
                  placeholder="Ingresa la edad" name="edad" onChange={handleChange} value={patient.edad} />
              </div>
            </div>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Telefono</h1>
            <div className="relative mb-3 xl:w-96" >
                  <input
                    type="tel"
                    className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                    ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                     dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow "
                    placeholder="Ingresa el Telefono" name="telefono" onChange={handleChange} value={patient.telefono}/>
            </div>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black"  >Correo Electrónico</h1>
            <div className="relative mb-3 xl:w-96" >
                  <input
                    type="email"
                    className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                    ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                     dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow "
                    placeholder="Escribe aquí el correo" name="correo" onChange={handleChange} value={patient.correo} />
            </div>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Dirección</h1>
            <div className="relative mb-3 xl:w-96" >
                  <input
                    type="text"
                    className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                    ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                     dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow "
                    placeholder="Escribe aquí la dirección" name="direccion" onChange={handleChange} value={patient.direccion} />

            </div>

            <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Contraseña</h1>
            <div className="relative mb-3 xl:w-96" >
                  <input
                    type="password"
                    className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                    ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
                     dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow "
                    placeholder="Escribe aquí la contraseña" name="password_p" onChange={handleChange} value={patient.password_p} />

            </div>


          </div>
          <div className="flex justify-between py-2">
          <button className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full disabled:bg-gray-400" type="submit" 
          disabled={!patient.apellidos || !patient.correo || !patient.direccion || !patient.dni_p || !patient.edad || !patient.fecha_nacimiento
              || !patient.nombres || !patient.password_p || !patient.sexo || !patient.telefono  }>
            { loading ? "Cargando.." : "Guardar" }
          </button>
          <button className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full" type="button" onClick={() => navigate('/pacientes')}>
              Cancelar
          </button>
          </div>
        </form>
        </div>
        </div>
    </div>
    </div>
  )
}

export default PatientForm