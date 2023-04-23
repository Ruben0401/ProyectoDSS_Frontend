import React from 'react'
import GoogleMapReact from 'google-map-react'
import {FaMapMarkerAlt} from 'react-icons/fa'
import { useState } from 'react';

const Marker = ({ text,color }) => 
<div><FaMapMarkerAlt size={25} color={color}></FaMapMarkerAlt>{text}</div>;

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
          <Marker key={datos[0].id_detallealerta}
            lat={+datos[0].latitud}
            lng={+datos[0].longitud}
            text={datos[0].dni_p}
            color={'green'}
            />
            <Marker key={datos[1].id_detallealerta}
            lat={+datos[1].latitud}
            lng={+datos[1].longitud}
            text={datos[1].dni_p}
            color={'red'}
            />

      </GoogleMapReact>
    </div>
  )
}

export default Map