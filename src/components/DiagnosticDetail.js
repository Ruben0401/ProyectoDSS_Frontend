import React,{useContext} from 'react'
import {BiFile} from 'react-icons/bi'
import {AiOutlineFileText} from 'react-icons/ai'
import {useNavigate,useParams,useLocation } from 'react-router-dom'
import {useState,useEffect} from 'react'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'

function DiagnosticDetail() {
    const {logged} = useContext(Contexts)
    const navigate=useNavigate();
    const params = useParams();
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
      const res=await fetch(`${url}/diagnosticos/${id}/info`)
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
      if (!logged) {
        navigate('/')
      }
      else{
        loadDiagnostic()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div>
    <div className=" p-5 flex justify-center flex-col items-center">
        <div>
        <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
        <BiFile size={40} color={"#3693E9"} ></BiFile>  
        Detalle de Diagnóstico
        </div>
            <div className="box-table ">
              <div className="p-4 flex justify-center items-center flex-col px-56">
              <AiOutlineFileText size={120} color={"#3693E9"} ></AiOutlineFileText>
              <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Paciente</h1>
              <div className="flex">
                <h1 >{patient.nombres} {patient.apellidos}</h1>
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
              <button className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full" 
                onClick={() => navigate(`/diagnosticos/${diagnostic.id_diagnostico}/edit`,{state:patient})} >
                  Modificar
              </button>
              <button className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full" 
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