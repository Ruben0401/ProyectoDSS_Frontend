import React from 'react'
import {BiBell,BiLeftArrowCircle} from 'react-icons/bi'
import {useLocation,useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
import Map from '../components/Map'
import Navbar from './Navbar'
import {url} from '../config/config'
function NotificationDetail() {
    const {state:notification} = useLocation();
    const params = useParams();
     
    const [fechaactual, setfechaactual] = useState()
    const [horaactual, sethoraactual] = useState()
    const [pacienteI, setpacienteI] = useState()
    const [pacienteS, setpacienteS] = useState()
    const [notificationxusers, setnotificationxusers] = useState([])

    const loadNotifications= async ()=>{
      let id = params.id
      const response = await fetch(`${url}/alertaxusuarios/${id}`)
      const data = await response.json()
      let fechita = new Date(Date.parse(notification.fecha));
      data.sort(function(a, b){
        return a.id_detallealerta - b.id_detallealerta;
      });
      setfechaactual(fechita.toLocaleDateString())
      sethoraactual(fechita.toLocaleTimeString())
      const dato = await loadPatient(data[1].dni_p)
      const datoS = await loadPatient(data[0].dni_p)
      setpacienteI(dato)
      setpacienteS(datoS)
      setnotificationxusers(data)
    }
    const loadPatient = async (dni)=>{
      const res=await fetch(`${url}/pacientes/${dni}`)
      const data= await res.json()
      
      let dato = data.nombres +" "+data.apellidos
      return dato
    }
    useEffect(()=>{
      loadNotifications()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
      <Navbar  dato={true}/>
    
    <div className=" p-5 flex justify-center flex-col items-center">
      <div>
      <div className=" flex items-center gap-2 font-bold text-xl py-2">
      <BiBell size={40} color={"#1294B0"} ></BiBell>  
      Alerta
      </div>
      <div className="box-table ">
        <div className="flex justify-between py-5">
            <div>
            </div>
            <button onClick={() => (window.history.back())}>
              <BiLeftArrowCircle size={40} color={"#1294B0"} ></BiLeftArrowCircle>
            </button>
        </div>
        <div className="py-5">
            <div className=" flex font-medium text-xl ">
                El paciente {pacienteS} se puso en contacto cercano con paciente {pacienteI} a las {horaactual} Horas el dia {fechaactual}
            </div>
            <br>
            </br>
            <div className=" flex font-bold text-xl  " >
                Resultado:
            </div>
            <div className=" flex font-medium text-xl ">
                El paciente {pacienteS} puede contraer la enfermedad del paciente {pacienteI}
            </div>
        </div>
        <div className="w-full">
        {
          (notificationxusers.length > 1) && <Map datos={notificationxusers} ></Map>
        }
        </div>

      </div>
      </div>
    </div>
    </div>
  )
}

export default NotificationDetail