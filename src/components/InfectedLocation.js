import React from 'react'
import {BiMap,BiMapAlt} from 'react-icons/bi'
import {useNavigate } from 'react-router-dom'
import {useEffect,useState,useContext} from 'react'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'


function InfectedLocation() {
    const {logged} = useContext(Contexts)
    const navigate=useNavigate();
    const [infectedlocations, setInfectedLocations] = useState([])
    const [infectedComponents, setInfectedComponents] = useState(<></>)

    const loadInfectedLocations= async ()=>{
      const response = await fetch(`${url}/infectados`)
      const data = await response.json()
      setInfectedLocations(data)
    }

    const loadPatient = async (dni)=>{
      const res=await  fetch(`${url}/pacientes/${dni}`)
      const data= await res.json()
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
      if (!logged) {
        navigate('/')
      }
      else{
        loadInfectedComponent(infectedlocations)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[infectedlocations])

    useEffect(()=>{
      if (!logged) {
        navigate('/')
      }
      else{
        loadInfectedLocations()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
    <div className=" p-5 flex justify-center flex-col items-center">
    <div>
    <div className=" flex items-center gap-2 font-semibold text-xl  py-3">
    <BiMap size={40} color={"#3693E9"} ></BiMap>  
    Control de Pacientes Contagiados
    </div>
    <div className="box-table ">
      
      <div className="overflow-auto rounded-lg shadow ">
        <table>
          <thead className="bg-[#3693E9] border-b-2 border-gray-200">
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