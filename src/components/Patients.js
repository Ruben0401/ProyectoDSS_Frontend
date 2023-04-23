import React,{useContext} from 'react'
import {BiUser,BiInfoCircle,BiFile,BiEdit,BiTrashAlt,BiPlusCircle,BiTestTube,BiCalendarAlt} from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'
import {useEffect,useState} from 'react'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'

function Patients() {
    const {user,logged} = useContext(Contexts)
    const navigate=useNavigate();
    const [patients, setpatients] = useState([])
    const loadPatients= async ()=>{
      const response = await fetch(`${url}/pacientes`)
      const data = await response.json()
      setpatients(data)
    }

    const handleDelete=async (dni) =>{
      await fetch(`${url}/pacientes/${dni}`, {
        method: "DELETE",
      })
      setpatients(patients.filter(patient => patient.dni_p !==dni))
    }
    const handleFilterDoctorxPatient=async (dni) =>{
      setpatients(patients.filter(patient => patient.dni_d ===dni))
    }
    const handleFilterAll=async () =>{
      loadPatients()
    }
    useEffect(()=>{
      if (!logged) {
        navigate('/')
      }
      else{
        loadPatients()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
    <div className=" p-5 flex justify-center flex-col items-center">
      <div>
      <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
      <BiUser size={40} color={"#3693E9"} ></BiUser>  
      Pacientes
      </div>
      <div className="box-table ">
        <div className="flex justify-between py-2">
        <button onClick={()=> navigate('/pacientes/new')}>
          <BiPlusCircle size={40} color={"#3693E9"} ></BiPlusCircle>
        </button>
        <div>
        <button type="button" className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full"  onClick={()=> handleFilterAll()} >
          Todos
        </button>
        <button type="button" className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-6 rounded-full " onClick={()=> handleFilterDoctorxPatient(user.dni_d)} >
          Asignados
        </button>
        </div>

        </div>
        
        <div className="overflow-auto rounded-lg shadow">
          <table>
            <thead className="bg-[#3693E9] border-b-2 border-gray-200 ">
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
                    <button onClick={() => navigate(`/pacientes/${patient.dni_p}`)}> <BiInfoCircle size={30}></BiInfoCircle> </button>
                    <button onClick={() => navigate('/diagnosticos/',{state:patient})}> <BiFile       size={30}></BiFile>       </button> 
                    <button onClick={() => navigate('/pruebas/',{state:patient})}> <BiTestTube       size={30}></BiTestTube></button>
                    <button onClick={() => navigate('/citas/',{state:patient})}> <BiCalendarAlt       size={30}></BiCalendarAlt></button>
                    <button onClick={ () => navigate(`/pacientes/${patient.dni_p}/edit`)}> <BiEdit size={30}></BiEdit></button>  
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