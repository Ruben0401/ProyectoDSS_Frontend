import React,{useContext} from 'react'
import {BiUser} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import { useNavigate,useParams  } from 'react-router-dom'
import {useState,useEffect} from 'react'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'

function PatientDetail() {
    const {logged} = useContext(Contexts)
    const navigate=useNavigate();
    const params = useParams();
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

    const loadPatient = async(dni)=>{
      const res=await fetch(`${url}/pacientes/${dni}`)
      const data= await res.json()
      
      setpatient({
        dni_p : data.dni_p,
        nombres : data.nombres, 
        apellidos : data.apellidos, 
        fecha_nacimiento : data.fecha_nacimiento, 
        sexo : data.sexo, 
        edad : data.edad, 
        telefono : data.telefono, 
        correo : data.correo, 
        direccion : data.direccion, 
        password_p : data.password_p,
      })
      
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
    
    <div className=" p-5 flex justify-center flex-col items-center">
      <div>
      <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
      <BiUser size={40} color={"#3693E9"} ></BiUser>  
      Detalle de Paciente
      </div>
      <div className="box-table ">
        <div className="p-4 flex justify-center items-center flex-col px-56">
        <CgProfile size={120} color={"#3693E9"} ></CgProfile>
        <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >DNI</h1>
        <h1>{patient.dni_p}</h1>
        <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Nombres y Apellidos</h1>
        <div className="flex">
        <h1>{patient.nombres} {patient.apellidos}</h1>
        </div>
        <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Fecha de Nacimiento</h1>
        <h1>{patient.fecha_nacimiento.substring(8,10)} / {patient.fecha_nacimiento.substring(5,7)} / {patient.fecha_nacimiento.substring(0,4)}</h1>
        <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Sexo</h1>
        <h1>{patient.sexo}</h1>
        <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Edad</h1>
        <h1>{patient.edad}</h1>
        <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Telefono</h1>
        <h1>{patient.telefono}</h1>
        <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Correo Electrónico</h1>
        <h1>{patient.correo}</h1>
        <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Dirección</h1>
        <h1>{patient.direccion}</h1>
        </div>
        <div className="flex justify-between py-2">
        <button className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full" onClick={ () => navigate(`/pacientes/${patient.dni_p}/edit`)} >
            Modificar
        </button>
        <button className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full" onClick={() => (window.history.back())}>
            Regresar
        </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default PatientDetail