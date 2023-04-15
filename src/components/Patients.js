import React from 'react'
import Navbar from './Navbar'
import {BiUser,BiInfoCircle,BiFile,BiEdit,BiTrashAlt,BiPlusCircle,BiTestTube,BiCalendarAlt} from 'react-icons/bi'
import { useNavigate,useLocation } from 'react-router-dom'
import {useEffect,useState} from 'react'

function Patients() {

    const navigate=useNavigate();
    const [patients, setpatients] = useState([])
    const {state:doclog} = useLocation();
    const loadPatients= async ()=>{
      const response = await fetch('http://localhost:4000/pacientes')
      const data = await response.json()

      setpatients(data)
    }

    const handleDelete=async (dni) =>{
      await fetch(`http://localhost:4000/pacientes/${dni}`, {
        method: "DELETE",
      })
      setpatients(patients.filter(patient => patient.dni_p !==dni))
    }

    useEffect(()=>{
      loadPatients()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
    <Navbar />
    <div className=" p-5 flex justify-center flex-col items-center">
      <div>
      <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
      <BiUser size={40} color={"#1294B0"} ></BiUser>  
      Pacientes
      </div>
      <div className="box-table ">
        <div className="flex justify-between py-2">
        <button onClick={()=> navigate('/pacientes/new',{state:doclog})}>
          <BiPlusCircle size={40} color={"#1294B0"} ></BiPlusCircle>
        </button>
        <div>
        <button type="button" className="bg-[#1294B0] hover:bg-blue-500 text-white font-bold py-2 px-10 rounded-full focus:outline-none focus:ring focus:ring-blue-500" >
          Todos
        </button>
        <button type="button" className="bg-[#1294B0] hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:ring focus:ring-blue-500" >
          Asignados
        </button>
        </div>

        </div>
        
        <div className="overflow-auto rounded-lg shadow">
          <table>
            <thead className="bg-[#1294B0] border-b-2 border-gray-200 ">
              <tr>
                <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">DNI</th>
                <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Nombre Completo</th>
                <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                patients.map( (patient) => (
                  <tr className="bg-white" key={patient.dni_p} >
                  <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold px-10">{patient.dni_p}</td>
                  <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold px-10">{patient.nombres} {patient.apellidos}</td>
                  <td className="p-3">
                  <div className="flex items-center justify-center px-10">
                    <button onClick={() => navigate(`/pacientes/${patient.dni_p}`,{state:doclog})}> <BiInfoCircle size={30}></BiInfoCircle> </button>
                    <button onClick={() => navigate('/diagnosticos/',{state:{patient,doclog}})}> <BiFile       size={30}></BiFile>       </button> 
                    <button onClick={() => navigate('/pruebas/',{state:{patient,doclog}})}> <BiTestTube       size={30}></BiTestTube></button>
                    <button onClick={() => navigate('/citas/',{state:{patient,doclog}})}> <BiCalendarAlt       size={30}></BiCalendarAlt></button>
                    <button onClick={ () => navigate(`/pacientes/${patient.dni_p}/edit`,{state:doclog})}> <BiEdit size={30}></BiEdit></button>  
                    <button onClick={()=> handleDelete(patient.dni_p)} > <BiTrashAlt   size={30}></BiTrashAlt>   </button> 
                  </div>
                  </td>
                  </tr>
                )
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
    </div>
  )
}

export default Patients