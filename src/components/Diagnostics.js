import React,{useContext} from 'react'
import {BiInfoCircle,BiFile,BiTrashAlt,BiLeftArrowCircle,BiPlusCircle,BiEdit} from 'react-icons/bi'
import {useNavigate,useLocation } from 'react-router-dom'
import {useEffect,useState} from 'react'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'

function Diagnostics() {
    const {logged} = useContext(Contexts)
    const navigate=useNavigate();
    const {state:patient} = useLocation();
    const [diagnostics, setdiagnostics] = useState([])

    const loadDiagnostics= async ()=>{
      const response = await fetch(`${url}/diagnosticos/${patient.dni_p}`)
      const data = await response.json()
      setdiagnostics(data)
    }


    const handleDelete=async (id) =>{
      await fetch(`${url}/diagnosticos/${id}`, {
        method: "DELETE",
      })
      setdiagnostics(diagnostics.filter(diagnostic => diagnostic.id_diagnostico !==id))
    }

    useEffect(()=>{
      if (!logged) {
        navigate('/')
      }
      else{
        loadDiagnostics()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div>
    <div className=" p-5 flex justify-center flex-col items-center">
    <div>
    <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
    <BiFile size={40} color={"#3693E9"} ></BiFile>  
    Diagnósticos del Paciente
    </div>
    <div className="box-table ">
        <div className="flex justify-between py-2 items-center">
          <button onClick={() => navigate('/diagnosticos/new',{state:patient})}>
            <BiPlusCircle size={40} color={"#3693E9"} ></BiPlusCircle>
          </button>
          <button onClick={() => navigate('/pacientes')}>
            <BiLeftArrowCircle size={40} color={"#3693E9"} ></BiLeftArrowCircle>
          </button>
        </div>
      <div className="flex justify-between py-2 items-center">
      <div className="inline-flex">
        <h1 className="text-base font-bold tracking-wide text-center font-sans text-black">Paciente: </h1> 
        <h1 className="px-2 text-base font-semibold tracking-wide text-center font-sans text-black">{patient.nombres} {patient.apellidos}</h1>
      </div>
        <div></div>
      </div>
      
      <div className="overflow-auto rounded-lg shadow ">
        <table>
          <thead className="bg-[#3693E9] border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Fecha</th>
              <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Posible Enfermedad</th>
              <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Estado</th>
              <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              diagnostics.map((diagnostic) =>(
                <tr className="bg-white" key={diagnostic.id_diagnostico}>
                <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">
                  {diagnostic.fecha.substring(8,10)}/{diagnostic.fecha.substring(5,7)}/{diagnostic.fecha.substring(0,4)}
                </td>
                <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">{diagnostic.enfermedad}</td>
                <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">{diagnostic.estado}</td>
                <td className="p-3">
                <div className="flex items-center justify-center">
                  
                  <button onClick={() => navigate(`/diagnosticos/${diagnostic.id_diagnostico}/detail`,{state:patient})}> <BiInfoCircle size={30}></BiInfoCircle> </button>
                  <button onClick={ () => navigate(`/diagnosticos/${diagnostic.id_diagnostico}/edit`,{state:patient})}> <BiEdit size={30}></BiEdit></button> 
                  <button onClick={()=> handleDelete(diagnostic.id_diagnostico)}> <BiTrashAlt   size={30}></BiTrashAlt>   </button> 
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

export default Diagnostics