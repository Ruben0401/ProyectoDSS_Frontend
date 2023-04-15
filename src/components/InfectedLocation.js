import React from 'react'
import Navbar from './Navbar'
import {BiMap,BiMapAlt} from 'react-icons/bi'
import {useNavigate,useLocation } from 'react-router-dom'
import {useEffect,useState} from 'react'
import {url} from '../config/config'


function InfectedLocation() {
    const navigate=useNavigate();
    const [infectedlocations, setInfectedLocations] = useState([])
    const [patient, setpatient] = useState([])
    const {state:doclog} = useLocation();
    const [infectedComponents, setInfectedComponents] = useState(<></>)

    const loadInfectedLocations= async ()=>{
      const response = await fetch(`${url}/infectados`)
      const data = await response.json()
      console.log(data)
      setInfectedLocations(data)
    }

    const loadPatient = async (dni)=>{
      const res=await  fetch(`${url}/pacientes/${dni}`)
      const data= await res.json()
      setpatient(data)
      let dato = data.nombres +" "+data.apellidos
      return dato
    }

    const loadInfectedComponent = async(data)=>{
      let components = await Promise.all(data.map(async(infectedlocation)=>(
        <tr className="bg-white" key={infectedlocation.id_infectado}>
          <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">{infectedlocation.dni_p}</td>
          <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">{ await loadPatient(infectedlocation.dni_p)}</td>
          <td className="p-3">
          <div className="flex items-center justify-center">
            <button onClick={ async ()=>navigate(`/infectados/${infectedlocation.id_infectado}`,{state:infectedlocation})}> <BiMapAlt size={30}></BiMapAlt> </button>
          </div>
          </td>
        </tr>
        )
        ))
        setInfectedComponents(components)
    }
    useEffect(()=>{
      loadInfectedComponent(infectedlocations)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[infectedlocations])

    useEffect(()=>{
      loadInfectedLocations()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
    <Navbar/>
    <div className=" p-5 flex justify-center flex-col items-center">
    <div>
    <div className=" flex items-center gap-2 font-semibold text-xl  py-3">
    <BiMap size={40} color={"#1294B0"} ></BiMap>  
    Control de Pacientes Contagiados
    </div>
    <div className="box-table ">
      
      <div className="overflow-auto rounded-lg shadow ">
        <table>
          <thead className="bg-[#1294B0] border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-base font-bold tracking-wide text-center  text-white">DNI</th>
              <th className="p-3 text-base font-bold tracking-wide text-center  text-white">Nombre Completo</th>
              <th className="p-3 text-base font-bold tracking-wide text-center  text-white">Ver Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {infectedComponents}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </div>
  </div>
  )
}

export default InfectedLocation