import React from 'react'
import {BiUser} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import { useNavigate,useParams,useLocation  } from 'react-router-dom'
import {useState,useEffect} from 'react'
import Navbar from './Navbar'
function PatientDetail() {
    const navigate=useNavigate();
    const params = useParams();
    const tab = <>&nbsp;</>;
    const {state:doclog} = useLocation();
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
      const res=await fetch(`http://localhost:4000/pacientes/${dni}`)
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
        loadPatient(params.dni)
      }
    },[params.dni])

    
  return (
    <div>
      <Navbar dato={true}/>
    <div className=" p-5 flex justify-center flex-col items-center">
      <div>
      <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
      <BiUser size={40} color={"#1294B0"} ></BiUser>  
      Detalle de Paciente
      </div>
      <div className="box-table ">
        <div className="p-4 flex justify-center items-center flex-col px-56">
        <CgProfile size={120} color={"#1294B0"} ></CgProfile>
        <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >DNI</h1>
        <h1>{patient.dni_p}</h1>
        <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Nombres y Apellidos</h1>
        <div className="flex">
        <h1 >{patient.nombres}</h1>{tab} <h1 >{patient.apellidos}</h1>
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
        <button className="bg-[#1294B0] hover:bg-blue-500 text-white font-bold py-2 px-10 rounded-full" onClick={ () => navigate(`/pacientes/${patient.dni_p}/edit`,{state:doclog})} >
            Modificar
        </button>
        <button className="bg-[#1294B0] hover:bg-blue-500 text-white font-bold py-2 px-10 rounded-full" onClick={() => (window.history.back())}>
            Regresar
        </button>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default PatientDetail