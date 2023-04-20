import React from 'react'
import GoogleMapReact from 'google-map-react'
import {FaMapMarkerAlt} from 'react-icons/fa'
import { useState } from 'react';

const Marker = ({ text }) => 
<div><FaMapMarkerAlt size={25} color="red"></FaMapMarkerAlt>{text}</div>;

function Map({datos}) {


      const [props] = useState({
        center:{
          lat: +datos[0]["latitud"],
          lng: +datos[0]["longitud"]
        },
        zoom: 22
      })
      
  return (
    <div style={{ height: '50vh' }} className="w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDrscGnOAIIpURZEXG4zgJqDXD1JF18VPQ' }}
        //defaultCenter={defaultCenter}
        defaultZoom={props.zoom}
        center={props.center}
      >
          { datos.map((usuario)=>
          (
            <Marker key={usuario.id_detallealerta}
            lat={+usuario.latitud}
            lng={+usuario.longitud}
            text={usuario.dni_p}
            />
          )
          )
          }

      </GoogleMapReact>
    </div>
  )
}

export default Map