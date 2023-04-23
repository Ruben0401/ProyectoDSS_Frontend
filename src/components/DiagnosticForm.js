import React,{useContext}  from 'react'
import {BiFile} from 'react-icons/bi'
import {AiOutlineFileText} from 'react-icons/ai'
import { useNavigate,useParams,useLocation } from 'react-router-dom'
import {useState,useEffect} from 'react'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'



function DiagnosticForm() {
    const {user,logged} = useContext(Contexts)
    const navigate=useNavigate();
    const params = useParams();
    const [loading, setloading] = useState(false);
    const [editing, setediting] = useState(false);
    const [diagnostic, setdiagnostic] = useState({

      dni_p : '',
      enfermedad : '', 
      fecha : '', 
      estado : '', 
      descripcion : '',
    }) 
    const {state:patient} = useLocation();

    const loadDiagnostic = async()=>{
      let id = params.id
      let diagnosticNew = {}
      if(id){
      setediting(true)
      const res=await fetch(`${url}/diagnosticos/${id}/info`)
      const data= await res.json()
      diagnosticNew = {
        dni_p : data.dni_p,
        enfermedad : data.enfermedad, 
        fecha : data.fecha.substring(0,10), 
        estado : data.estado, 
        descripcion : data.descripcion, 
      }
      }else{
        diagnosticNew = {
          ...diagnostic,
          fecha:obtenerFecha(),
          dni_p: patient.dni_p,
          enfermedad:'COVID-19',
        }
      }
      setdiagnostic(diagnosticNew)
    }

    const handleSubmit= async (e) =>{
      e.preventDefault();

      setloading(true);
      if (editing){
        await fetch(`${url}/diagnosticos/${params.id}`,{
              method: "PUT",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify(diagnostic)
          })
      } else{
        await fetch(`${url}/diagnosticos`,
        {

            method:'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(diagnostic),
        })
        let doctor ={}
        doctor ={
          dni_d : user.dni_d
        }
        await fetch(`${url}/pacientes/${patient.dni_p}/asigna`,{
              method: "PUT",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify(doctor)
        })
      }
      setloading(false);
      navigate('/diagnosticos/',{state:patient})

    }


    function obtenerFecha (){
      var fecha = new Date(); //Fecha actual
      var mes = fecha.getMonth()+1; //obteniendo mes
      var dia = fecha.getDate(); //obteniendo dia
      var ano = fecha.getFullYear(); //obteniendo año
      if(dia<10)
        dia='0'+dia; //agrega cero si el menor de 10
      if(mes<10)
        mes='0'+mes //agrega cero si el menor de 10
      var val =ano+"-"+mes+"-"+dia
      return val
    }

    const handleChange = e=>{
      setdiagnostic({...diagnostic,[e.target.name]: e.target.value});
      
    }

    useEffect(()=> {
      if (!logged) {
        navigate('/')
      }
      else{
        loadDiagnostic();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    

    
  return (
    <div>
    <div className=" p-5 flex justify-center flex-col items-center">
        <div>
        <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
        <BiFile size={40} color={"#3693E9"} ></BiFile>  
        {editing ? "Modificar Diagnóstico":"Formulario de Diagnósticos"}
        </div>
        <div className="box-table">
        <form onSubmit={handleSubmit}>
          <div className="p-4 flex justify-center items-center flex-col px-56">
          <AiOutlineFileText size={120} color={"#3693E9"} ></AiOutlineFileText>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Fecha de Registro</h1>
          <div className="mb-3 xl:w-96">
          <input type="date"  readOnly
          className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
              dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow"
                name="fecha" value={ diagnostic.fecha } ></input>

          </div>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Paciente</h1>
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <select className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
               dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow" 
                name="dni_p" onChange={handleChange} value={diagnostic.dni_p} required disabled>
                  <option value={patient.dni_p}>{patient.nombres} {patient.apellidos}</option>
                </select>
              </div>
            </div>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Enfermedad</h1>
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <select className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
               dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow" 
                name="enfermedad" onChange={handleChange} value={diagnostic.enfermedad} required disabled>
                  <option value="COVID-19">COVID-19</option>
                </select>
              </div>
            </div>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Estado</h1>
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <select className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
               dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow"
                name="estado" onChange={handleChange} value={diagnostic.estado} required>
                  <option value=""> -- Selecciona Estado -- </option>
                  <option value="Necesita Prueba">Necesita Prueba</option>
                  <option value="No Presenta Enfermedad">No Presenta Enfermedad</option>
                </select>
              </div>
            </div>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Descripción</h1>
          <textarea className="bg-gray-100" cols={70} rows={4} name="descripcion" onChange={handleChange} value={diagnostic.descripcion} required>      
          </textarea>
      
          </div>
          <div className="flex justify-between py-2">
          <button className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full disabled:bg-gray-400" type="submit" 
          disabled={!diagnostic.dni_p || !diagnostic.descripcion || !diagnostic.estado || !diagnostic.fecha  }>
            { loading ? "Cargando.." : "Guardar" }
          </button>
          <button type="button" className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full" onClick={() => navigate('/diagnosticos/',{state:patient})}>
              Cancelar
          </button>
          </div>
        </form>
        </div>
        </div>
    </div>
    </div>
  )
}



export default DiagnosticForm