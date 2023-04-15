import React from 'react'
import {BiBell,BiLeftArrowCircle} from 'react-icons/bi'
import {useLocation,useParams} from 'react-router-dom'
import {useEffect,useState} from 'react'
import Map from '../components/Map'
import Navbar from './Navbar'
function NotificationDetail() {
    const tab = <>&nbsp;</>;
    const {state:notification} = useLocation();
    const params = useParams();
    const [notificationComponentsa, setNotificationComponentsa] = useState(<></>)
    const [notificationComponentsb, setNotificationComponentsb] = useState(<></>)
    const [notificationxusers, setnotificationxusers] = useState([])

    const loadNotifications= async ()=>{
      let id = params.id
      const response = await fetch(`http://localhost:4000/alertaxusuarios/${id}`)
      const data = await response.json()

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
                a las {notification.fecha.substring(11,13)}:{notification.fecha.substring(14,16)} Horas el dia {notification.fecha.substring(8,10)}/{notification.fecha.substring(5,7)}/{notification.fecha.substring(0,4)}
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