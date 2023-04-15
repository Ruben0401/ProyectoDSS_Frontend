import React from 'react'
import {BiTrashAlt,BiLeftArrowCircle,BiPlusCircle,BiEdit,BiCalendar} from 'react-icons/bi'
import { useNavigate,useLocation } from 'react-router-dom'
import {useEffect,useState} from 'react'
import Navbar from './Navbar'

function Cites() {
    const navigate=useNavigate();
    const {state:{patient,doclog}} = useLocation();
    const [cites, setCites] = useState([])

    const loadCites= async ()=>{
      const response = await fetch(`http://localhost:4000/citas/${patient.dni_p}`)
      const data = await response.json()
      setCites(data)

    }

    const handleDelete=async (id) =>{
      await fetch(`http://localhost:4000/citas/${id}`, {
        method: "DELETE",
      })
      setCites(cites.filter(cite => cite.id_cita !==id))
    }

    useEffect(()=>{
        loadCites()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
    <Navbar dato={true}/>
  
  <div className=" p-5 flex justify-center flex-col items-center">
    <div>
    <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
    <BiCalendar size={40} color={"#1294B0"} ></BiCalendar>  
    Citas del Paciente
    </div>
    <div className="box-table ">
        <div className="flex justify-between py-2 items-center">
          <button onClick={() => navigate('/citas/new',{state:{patient,doclog}})}>
            <BiPlusCircle size={40} color={"#1294B0"} ></BiPlusCircle>
          </button>
          <button onClick={() => navigate('/pacientes',{state:doclog})}>
            <BiLeftArrowCircle size={40} color={"#1294B0"} ></BiLeftArrowCircle>
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
          <thead className="bg-[#1294B0] border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Fecha de Cita</th>
              <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Hora de Inicio</th>
              <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Hora Fin</th>
              <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              cites.map((cite)=>(
              <tr className="bg-white" key={cite.id_cita}>
                <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">
                  {cite.fecha.substring(8,10)}/{cite.fecha.substring(5,7)}/{cite.fecha.substring(0,4)}
                </td>
                <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">{cite.hora_inicio.substring(0,5)}</td>
                <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">{cite.hora_fin.substring(0,5)}</td>
                <td className="p-3">
                <div className="flex items-center justify-center">
                <button onClick={ () => navigate(`/citas/${cite.id_cita}/edit`,{state:{patient,doclog}})}> <BiEdit size={30}></BiEdit></button>
                <button onClick={()=> handleDelete(cite.id_cita)}> <BiTrashAlt   size={30}></BiTrashAlt>   </button> 
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

export default Cites