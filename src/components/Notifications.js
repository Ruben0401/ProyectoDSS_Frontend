import {BiInfoCircle,BiBell} from 'react-icons/bi'
import {useNavigate,useLocation } from 'react-router-dom'
import {useEffect,useState} from 'react'
import Navbar from './Navbar'
function Notifications() {
    const navigate=useNavigate();
    const [notifications, setnotifications] = useState([])
    const {state:doclog} = useLocation();
    
    const loadNotifications= async ()=>{
      const response = await fetch('http://localhost:4000/alertas')
      const data = await response.json()

      setnotifications(data)
    }


    useEffect(()=>{
      loadNotifications()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
      <Navbar/>
    <div className=" p-5 flex justify-center flex-col items-center">
      <div>
      <div className=" flex items-center gap-2 font-bold text-xl py-3">
      <BiBell size={40} color={"#1294B0"} ></BiBell>  
      Notificaciones
      </div>
      <div className="box-table ">
        <div className="overflow-auto rounded-lg shadow ">
          <table>
            <thead className="bg-[#1294B0] border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-base font-bold tracking-wide text-center text-white">Descripción</th>
                <th className="p-3 text-base font-bold tracking-wide text-center text-white">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {
                notifications.map((notification)=>(
                  <tr className="bg-white" key={notification.id_alerta}>
                  <td className="p-3 text-base text-black tracking-wide text-center items-center font-semibold">El Paciente {notification.descripcion} se relacionó con un usuario contagiado</td>
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