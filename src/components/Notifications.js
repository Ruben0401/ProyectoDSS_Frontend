import {BiInfoCircle,BiBell} from 'react-icons/bi'
import {useNavigate } from 'react-router-dom'
import {useEffect,useState,useContext} from 'react'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'

function Notifications() {
    const {logged} = useContext(Contexts)
    const navigate=useNavigate();
    const [notifications, setnotifications] = useState([])
    const loadNotifications= async ()=>{
      const response = await fetch(`${url}/alertas`)
      const data = await response.json()

      setnotifications(data)
    }


    useEffect(()=>{
      if (!logged) {
        navigate('/')
      }
      else{
        loadNotifications()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
    <div className=" p-5 flex justify-center flex-col items-center">
      <div>
      <div className=" flex items-center gap-2 font-bold text-xl py-3">
      <BiBell size={40} color={"#3693E9"} ></BiBell>  
      Notificaciones
      </div>
      <div className="box-table ">
        <div className="overflow-auto rounded-lg shadow ">
          <table>
            <thead className="bg-[#3693E9] border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-base font-bold tracking-wide text-center text-white">Descripción</th>
                <th className="p-3 text-base font-bold tracking-wide text-center text-white">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {
                notifications.map((notification)=>(
                  <tr className="bg-white" key={notification.id_alerta}>
                  <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">El Paciente {notification.descripcion} se relacionó con un usuario contagiado el dia {new Date(notification.fecha).toLocaleDateString('en-GB')} a las {new Date(notification.fecha).toLocaleTimeString('en-US')}</td>
                  <td className="p-3">
                  <div className="flex items-center justify-center">
                    <button onClick={()=>navigate(`/notificaciones/${notification.id_alerta}`,{state:notification})} > <BiInfoCircle size={30}></BiInfoCircle> </button>
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

export default Notifications