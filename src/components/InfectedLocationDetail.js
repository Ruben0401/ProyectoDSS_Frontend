import React from 'react'
import {BiLeftArrowCircle,BiMapAlt} from 'react-icons/bi'
import {useLocation,useParams,useNavigate } from 'react-router-dom'
import {useEffect,useState,useContext} from 'react'
import InfectedMap from '../components/InfectedMap'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'

function InfectedLocationDetail() {
  const {logged} = useContext(Contexts)
  const navigate=useNavigate();
  const params = useParams();
  const {state:infectedlocation} = useLocation();
  const [infectedpatient, setInfectedPatient] = useState({

    id_infectado:'',
    dni_p : '',
    latitud : '', 
    longitud : '', 
    estado : '', 
  }) 

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

  const loadInfectedPatient = async()=>{
    let id = params.id
    let infectedpatient = {}
    const res=await fetch(`${url}/infectados/${id}`)
    const data= await res.json()
    infectedpatient = {
      id_infectado: data.id_infectado,
      dni_p : data.dni_p,
      latitud : data.latitud, 
      longitud : data.longitud, 
      estado : data.estado, 
    }
    setInfectedPatient(infectedpatient);

    const result=await fetch(`${url}/pacientes/${infectedpatient.dni_p}`)
    const datosP = await result.json()
    let patient = {}
    patient = {
      dni_p : datosP.dni_p,
      nombres : datosP.nombres, 
      apellidos : datosP.apellidos, 
      fecha_nacimiento : datosP.fecha_nacimiento.substring(0, 10), 
      sexo : datosP.sexo, 
      edad : datosP.edad, 
      telefono : datosP.telefono, 
      correo : datosP.correo, 
      direccion : datosP.direccion, 
      password_p : datosP.password_p,
    }
    setpatient(patient)
  }

  useEffect(()=> {
    if (!logged) {
      navigate('/')
    }
    else{
      loadInfectedPatient()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <div>
    
    <div className=" p-5 flex justify-center flex-col items-center">
      <div className='w-full'>
      <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-2">
      <BiMapAlt size={40} color={"#3693E9"} ></BiMapAlt>  
      Localización
      </div>
      <div className="box-table ">
        <div className="flex justify-between py-5">
            <div>
              <div className=" flex font-bold text-xl font-[inter] ">
                Paciente:
              </div>
              <div className=" flex font-semibold text-xl font-[inter] ">
                {patient.nombres} {patient.apellidos} {infectedpatient.dni_p}
              </div>
              
            </div>
            <button onClick={() => (window.history.back())}>
              <BiLeftArrowCircle size={40} color={"#3693E9"} ></BiLeftArrowCircle>
            </button>
        </div>
        <div className="w-full">
        <InfectedMap datos={infectedlocation} ></InfectedMap>
        </div>

      </div>
      </div>
    </div>
    </div>
    
  )
}

export default InfectedLocationDetail