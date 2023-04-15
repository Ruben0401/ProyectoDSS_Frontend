import React from 'react'
import {BiTestTube} from 'react-icons/bi'
import {SiMinetest} from 'react-icons/si'
import { useParams,useLocation } from 'react-router-dom'
import {useState,useEffect} from 'react'
import Navbar from './Navbar'
import {url} from '../config/config'

function TestDetail() {
    
    const tab = <>&nbsp;</>;
    const params = useParams();
    const [test, settest] = useState({
      id_prueba: '',
      fecha_prueba : '',
      dni_p : '',
      tipo_prueba : '', 
      laboratorio : '', 
      resultado : '', 
    }) 
    const {state:patient} = useLocation();

    const loadTest = async()=>{
      let id = params.id
      let test = {}
      const res=await fetch(`${url}/pruebas/${id}/info`)
      const data= await res.json()
      test = {
        id_prueba : data.id_prueba,
        fecha_prueba : data.fecha_prueba,
        dni_p: data.dni_p,
        tipo_prueba : data.tipo_prueba,
        laboratorio : data.laboratorio, 
        resultado : data.resultado, 
      }
      settest(test)
    }

    useEffect(()=> {

      loadTest()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div>
      <Navbar dato={true}/>
    <div className=" p-5 flex justify-center flex-col items-center">
        <div>
            <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
            <BiTestTube size={40} color={"#1294B0"} ></BiTestTube>  
            Detalle de Prueba
            </div>
            <div className="box-table ">
              <div className="p-4 flex justify-center items-center flex-col px-64">
              <SiMinetest size={120} color={"#1294B0"}></SiMinetest>
              <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Paciente</h1>
              <div className="flex">
              <h1 >{patient.nombres}</h1>{tab}<h1 >{patient.apellidos}</h1>
              </div>
              <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Enfermedad a Comprobar</h1>
              <h1>{test.tipo_prueba}</h1>
              <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Fecha de Prueba</h1>
              <h1>{test.fecha_prueba.substring(8,10)} / {test.fecha_prueba.substring(5,7)} / {test.fecha_prueba.substring(0,4)}</h1>
              <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Laboratorio</h1>
              <h1>{test.laboratorio}</h1>
              <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Resultado</h1>
              <h1>{test.resultado}</h1>
              <div className="py-10">
              <button className="bg-[#1294B0] hover:bg-blue-500 text-white font-bold py-2 px-10 rounded-full" onClick={() => (window.history.back())}>
                  Regresar
              </button>
              </div>
              </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default TestDetail