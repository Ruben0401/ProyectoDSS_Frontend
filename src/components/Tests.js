import React from 'react'
import {BiTrashAlt,BiLeftArrowCircle,BiPlusCircle,BiTestTube,BiInfoCircle,BiEdit} from 'react-icons/bi'
import {useNavigate,useLocation } from 'react-router-dom'
import {useEffect,useState} from 'react'
import Navbar from './Navbar'
import {url} from '../config/config'

function Tests() {
    const navigate=useNavigate();
    const {state:{patient,doclog}} = useLocation();
    const [tests, settests] = useState([])

    const loadTests= async ()=>{
      const response = await fetch(`${url}/pruebas/${patient.dni_p}`)
      const data = await response.json()
      settests(data)

    }

    const handleDelete=async (id) =>{
      await fetch(`${url}/pruebas/${id}`, {
        method: "DELETE",
      })
      settests(tests.filter(test => test.id_prueba !==id))
    }

    useEffect(()=>{
      loadTests()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
  <div>
    <Navbar dato={true}/>
  
  <div className=" p-5 flex justify-center flex-col items-center">
    <div>
    <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
    <BiTestTube size={40} color={"#1294B0"} ></BiTestTube>  
    Pruebas del Paciente
    </div>
    <div className="box-table ">
        <div className="flex justify-between py-2 items-center">
          <button onClick={() => navigate('/pruebas/new',{state:{patient,doclog}})}>
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
              <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Fecha de Prueba</th>
              <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Enfermedad a Comprobar</th>
              <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Resultado</th>
              <th className="p-3 text-base font-bold tracking-wide text-center font-sans text-white">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              tests.map((test)=>(
              <tr className="bg-white" key={test.id_prueba}>
                <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">
                  {test.fecha_prueba.substring(8,10)}/{test.fecha_prueba.substring(5,7)}/{test.fecha_prueba.substring(0,4)}
                </td>
                <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">{test.tipo_prueba}</td>
                <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">{test.resultado}</td>
                <td className="p-3">
                <div className="flex items-center justify-center">
                <button onClick={() => navigate(`/pruebas/${test.id_prueba}/detail`,{state:{patient,doclog}})}> <BiInfoCircle size={30}></BiInfoCircle> </button>
                <button onClick={ () => navigate(`/pruebas/${test.id_prueba}/edit`,{state:{patient,doclog}})}> <BiEdit size={30}></BiEdit></button>
                <button onClick={()=> handleDelete(test.id_prueba)}> <BiTrashAlt   size={30}></BiTrashAlt>   </button> 
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

export default Tests