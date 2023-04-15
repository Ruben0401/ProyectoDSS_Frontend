import React from 'react'
import {BiMessage,BiPlusCircle,BiMessageDots,BiTrashAlt} from 'react-icons/bi'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import {useEffect,useState} from 'react'
import Navbar from './Navbar'

function Messages() {
  const navigate=useNavigate();
  const {state:doclog} = useLocation();
  const [roommessages, setroommessages] = useState([])
  const [roomComponents, setRoomComponents] = useState(<></>)
  
  const loadRoomMessages= async ()=>{
    const response = await fetch('http://localhost:4000/salamensajes')
    const data = await response.json()
    setroommessages(data)
  }

  const loadPatient = async (dni)=>{
    const res=await fetch(`http://localhost:4000/pacientes/${dni}`)
    const data= await res.json()
    
    let dato = data.nombres +" "+data.apellidos
    return dato
  }
  const handleDelete=async (id) =>{
    await fetch(`http://localhost:4000/salamensajes/${id}`, {
      method: "DELETE",
    })
    setroommessages(roommessages.filter(roommessage => roommessage.id_sala !==id))
  }
  const loadRoomComponent = async(data)=>{
    let components = await Promise.all(data.map(async(roommessage) => {
      return <tr className="bg-white text-center items-center" key={roommessage.id_sala} >
      <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">{roommessage.dni_p}</td>
      <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">{await loadPatient(roommessage.dni_p)}</td>
      <td className="p-3">
      <div className="flex justify-center text-center items-center">
        <button onClick={ () => navigate(`/mensajes/${roommessage.id_sala}`,{state:{doclog,roommessage}})}> <BiMessageDots size={30} ></BiMessageDots> </button>
        <button onClick={()=> handleDelete(roommessage.id_sala)} > <BiTrashAlt   size={30}></BiTrashAlt>   </button>
      </div>
      </td>
    </tr>
    }
    ))
    setRoomComponents(components)
  }

  useEffect(()=>{
    loadRoomComponent(roommessages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[roommessages])

  useEffect(()=>{
    loadRoomMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
    <Navbar/>
    
    <div className=" p-5 flex justify-center flex-col items-center">
      <div>
      <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
      <BiMessage size={40} color={"#1294B0"} ></BiMessage>  
      Mensajes
      </div>
      <div className="box-table ">
        <div className="flex justify-between py-2">
        <button onClick={ () => navigate('/mensajes/new',{state:doclog})}>
          <BiPlusCircle size={40} color={"#1294B0"} ></BiPlusCircle>
        </button>
        </div>

        <div className="overflow-auto rounded-lg shadow md:block hidden ">
          <table>
            <thead className="bg-[#1294B0] border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-base font-semibold tracking-wide text-center font-[inter] text-white">DNI</th>
                <th className="p-3 text-base font-semibold tracking-wide text-center font-[inter] text-white">Nombre Completo</th>
                <th className="p-3 text-base font-semibold tracking-wide text-center font-[inter] text-white">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {roomComponents}
            </tbody>
          </table>
        </div>
        {/* Para movil */}
        <div className="grid grid-cols-1 gap-2 md:hidden w-full">
          <div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
              <div className=" font-bold">72540988</div>
              <div className="flex flex-col justify-center  items-center gap-1 text-base">
              <div className="font-bold">DR. Ruben Andres Rodriguez Canahuire</div>
              <div ><Link to={"/"}> <BiMessageDots size={30} color={"#1294B0"} ></BiMessageDots> </Link></div>
              </div>
            </div>
          </div>
        </div>
        {/* Para movil */}

      </div>
      </div>
    </div>
    </div>
  )
}

export default Messages