import React, { useEffect,useState } from 'react'
import GoogleMapReact from 'google-map-react'
import {FaMapMarkerAlt} from 'react-icons/fa'
import {url} from '../config/config'

const Marker = ({ text }) => 
<div><FaMapMarkerAlt size={25} color="red"></FaMapMarkerAlt>{text}</div>;

function InfectedMap({datos}) {

    const [infectedatient, setInfectedPatient] = useState({
    
      id_infectado:'',
      dni_p : '',
      latitud : '', 
      longitud : '', 
      estado : '', 
    }) 
    const loadinfectado = async()=>{

      let infectedpatient = {}
      const res=await fetch(`${url}/infectados/${datos.id_infectado}`)
      const data= await res.json()
      infectedpatient = {
        id_infectado: data.id_infectado,
        dni_p : data.dni_p,
        latitud : data.latitud, 
        longitud : data.longitud, 
        estado : data.estado, 
      }
      setInfectedPatient(infectedpatient)
      
    }
    const [props] = useState({
      center:{
        lat: +datos.latitud,
        lng: +datos.longitud
      },
      zoom: 14
    })



    useEffect(()=>{
      let intervalID = setInterval(loadinfectado, 1000);
      return ()=>{
          clearInterval(intervalID)
          // cleanup
      }
    },[])


  return (
    <div className='h-[60vh]'>
      <div  className="w-full h-full relative">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDrscGnOAIIpURZEXG4zgJqDXD1JF18VPQ' }}
        defaultZoom={props.zoom}
        center={props.center}

      >
  
        <Marker
          lat={infectedatient.latitud}
          lng={infectedatient.longitud}
          text={infectedatient.dni_p}
        />
      </GoogleMapReact>
    </div>
    </div>
  )
}

export default InfectedMap