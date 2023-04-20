import React from 'react'
import {BiBell,BiLeftArrowCircle} from 'react-icons/bi'
import {useLocation,useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
import Map from '../components/Map'
import Navbar from './Navbar'
import {url} from '../config/config'
function NotificationDetail() {
    const tab = <>&nbsp;</>;
    const {state:notification} = useLocation();
    const params = useParams();
     
    const [fechaactual, setfechaactual] = useState()
    const [horaactual, sethoraactual] = useState()
    const [notificationComponentsa, setNotificationComponentsa] = useState(<></>)
    const [notificationComponentsb, setNotificationComponentsb] = useState(<></>)
    const [notificationxusers, setnotificationxusers] = useState([])

    const loadNotifications= async ()=>{
      let id = params.id
      const response = await fetch(`${url}/alertaxusuarios/${id}`)
      const data = await response.json()
      let fechita = new Date(Date.parse(notification.fecha));
      setfechaactual(fechita.toLocaleDateString())
      sethoraactual(fechita.toLocaleTimeString())
      setnotificationxusers(data)
    }

    const loadNotifiacionComponenta = async(data)=>{
      
      let components = await Promise.all(data.map(async(notificationxuser) => {
        return (
        <div key={notificationxuser.id_detallealerta}
         >{ (notificationxuser.id_detallealerta === 1) ? notificationxuser.dni_p : ""}</div>
      )
      }
      ))
      setNotificationComponentsa(components)
    }

    
    const loadNotifiacionComponentb = async(data)=>{
      
      let components = await Promise.all(data.map(async(notificationxuser) => {
        return (
        <div key={notificationxuser.id_detallealerta}
         >{ (notificationxuser.id_detallealerta === 2) ? notificationxuser.dni_p : ""}</div>
      )
      }
      ))
      setNotificationComponentsb(components)
    }
    useEffect(()=>{
      loadNotifiacionComponenta(notificationxusers)
      loadNotifiacionComponentb(notificationxusers)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[notificationxusers])
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
                El paciente{tab}{notificationComponentsa}{tab}
                se puso en contacto cercano con paciente{tab}{notificationComponentsb}{tab}
                a las {horaactual} Horas el dia {fechaactual}
            </div>
            <br>
            </br>
            <div className=" flex font-bold text-xl  " >
                Resultado:
            </div>
            <div className=" flex font-medium text-xl ">
                El paciente{tab}{notificationComponentsa}{tab}
                puede contraer la enfermedad del paciente{tab}{notificationComponentsb}{tab}
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