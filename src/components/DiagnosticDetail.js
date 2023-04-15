import React from 'react'
import Navbar from './Navbar'
import {BiFile} from 'react-icons/bi'
import {AiOutlineFileText} from 'react-icons/ai'
import { useNavigate,useParams,useLocation } from 'react-router-dom'
import {useState,useEffect} from 'react'

function DiagnosticDetail() {
    const navigate=useNavigate();
    
    const tab = <>&nbsp;</>;
    const params = useParams();
    const {state:doclog} = useLocation();
    const {state:patient} = useLocation();
    const [diagnostic, setdiagnostic] = useState({

      id_diagnostico:'',
      dni_p : '',
      enfermedad : '', 
      fecha : '', 
      estado : '', 
      descripcion : '',
    }) 
    

    const loadDiagnostic = async()=>{
      let id = params.id
      let diagnostic = {}
      const res=await fetch(`http://localhost:4000/diagnosticos/${id}/info`)
      const data= await res.json()
      diagnostic = {
        id_diagnostico: data.id_diagnostico,
        dni_p : data.dni_p,
        enfermedad : data.enfermedad, 
        fecha : data.fecha, 
        estado : data.estado, 
        descripcion : data.descripcion, 
      }
      setdiagnostic(diagnostic);
      
    }

    useEffect(()=> {

      loadDiagnostic()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div>
    <Navbar  dato={true}/>
    <div className=" p-5 flex justify-center flex-col items-center">
        <div>
        <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
        <BiFile size={40} color={"#1294B0"} ></BiFile>  
        Detalle de Diagnóstico
        </div>
            <div className="box-table ">
              <div className="p-4 flex justify-center items-center flex-col px-56">
              <AiOutlineFileText size={120} color={"#1294B0"} ></AiOutlineFileText>
              <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Paciente</h1>
              <div className="flex">
                <h1 >{patient.nombres}</h1>{tab}<h1 >{patient.apellidos}</h1>
              </div>
              <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Posible Enfermedad</h1>
              <h1>{diagnostic.enfermedad}</h1>
              <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Fecha de Registro</h1>
              <h1>{diagnostic.fecha.substring(8,10)} / {diagnostic.fecha.substring(5,7)} / {diagnostic.fecha.substring(0,4)}</h1>
              <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Estado</h1>
              <h1>{diagnostic.estado}</h1>
              <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Descripción</h1>
              <div>
              <textarea className="bg-gray-100" readOnly cols={70} rows={4} 
              value={diagnostic.descripcion}>
              </textarea>
              </div>
              </div>
              <div className="flex justify-between py-2">
              <button className="bg-[#1294B0] hover:bg-blue-500 text-white font-bold py-2 px-10 rounded-full" 
                onClick={() => navigate(`/diagnosticos/${diagnostic.id_diagnostico}/edit`,{state:patient},{state:doclog})} >
                  Modificar
              </button>
              <button className="bg-[#1294B0] hover:bg-blue-500 text-white font-bold py-2 px-10 rounded-full" 
                onClick={() => (window.history.back())}>
                  Regresar
              </button>
              </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default DiagnosticDetail