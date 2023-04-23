import React from 'react'
import {BiMessageAdd,BiMessageDetail} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import {useState,useEffect,useContext} from 'react'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'

function MessagesForm() {
  const {user,logged} = useContext(Contexts)
  const navigate=useNavigate();
  const [loading, setloading] = useState(false);
  const [roommessage, setroommessage] = useState({

    fecha_sala : '', 
    dni_d : '',
    dni_p : '',
  })



  const [patients, setpatients] = useState([])

  const loadPatients= async ()=>{
    let roommessagenew={}
    const response = await fetch(`${url}/pacientes`)
    const data = await response.json()
    roommessagenew = {
      ...roommessage,
      fecha_sala:obtenerFecha(),
    }
    setroommessage(roommessagenew)
    setpatients(data)

  }

  const handleSubmit= async (e) =>{
    e.preventDefault();

    setloading(true);
    //Registrar Sala de los mensajes
      let roommessageDNew={}  
      roommessageDNew = {
        ...roommessage,
        dni_d: user.dni_d,
      }
      setroommessage(roommessageDNew)
      await fetch(`${url}/salamensajes`,
      {

          method:'POST',
          headers: {'Content-type':'application/json'},
          body: JSON.stringify(roommessageDNew),
      })
    //Registrar Sala de los mensajes


      setloading(false);
      navigate('/mensajes')

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
   setroommessage({...roommessage,[e.target.name]: e.target.value});
  }
  useEffect(()=> {
    if (!logged) {
      navigate('/')
    }
    else{
      loadPatients()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

    
  return (
    <div>
    <div className=" p-5 flex justify-center flex-col items-center">
        <div>
        <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
        <BiMessageAdd size={40} color={"#3693E9"} ></BiMessageAdd>  
        Crear Nueva Conversación
        </div>
        <div className="box-table ">
        <form onSubmit={handleSubmit}>
          <div className="p-4 flex justify-center items-center flex-col px-56">
          <BiMessageDetail size={120} color={"#3693E9"} ></BiMessageDetail>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Fecha de Creación</h1>
          <div className="mb-3 xl:w-96">
          <input type="date"  readOnly
          className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
               dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow"
               name="fecha_sala" value={ roommessage.fecha_sala }></input>

          </div>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Paciente</h1>
            <div className="flex justify-center">
              <div className="mb-3 xl:w-96">
                <select className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
               dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow"
                  name="dni_p" onChange={handleChange}  required >
                    <option value=""> -- Selecciona Paciente -- </option>
                  {
                    patients.map((patient)=>(
                    <option value={patient.dni_p} key={patient.dni_p}>{patient.nombres} {patient.apellidos}</option>
                    )
                    )
                  }
                </select>
              </div>
            </div>

      
          </div>
          <div className="flex justify-between py-2">
          <button className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full disabled:bg-gray-400" type="submit" disabled={!roommessage.dni_p} >
          { loading ? "Cargando.." : "Guardar" }
          </button>
          <button type="button" className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full" onClick={() => navigate('/mensajes')}>
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

export default MessagesForm