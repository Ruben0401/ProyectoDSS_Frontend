import React from 'react'
import {BiCalendar} from 'react-icons/bi'
import {BsFillCalendar2PlusFill} from 'react-icons/bs'
import { useNavigate,useParams,useLocation } from 'react-router-dom'
import {useState,useEffect,useContext} from 'react'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'

function CitesForm() {
  const {user,logged} = useContext(Contexts)
  const navigate=useNavigate();
  const params = useParams();
  const [loading, setloading] = useState(false);
  const [editing, setediting] = useState(false);
  const [cite, setCite] = useState({
    fecha : '',
    hora_inicio : '',
    hora_fin : '', 
    dni_p : '', 
    dni_d : '', 
  }) 
  const [horascita, setHorascita] = useState({
    hora_inicio : '',
    minuto_inicio : '',
    hora_fin : '', 
    minuto_fin : '', 
  })


  const {state:patient} = useLocation();

  const loadCite = async()=>{
    let id = params.id
    let citeNew = {}
    let horascitaDetail ={}
    if(id){
    setediting(true)
    const res=await fetch(`${url}/citas/${id}/info`)
    const data= await res.json()
    citeNew = {
      fecha : data.fecha.substring(0,10),
      hora_inicio: data.hora_inicio,
      hora_fin : data.hora_fin,
      dni_p : data.dni_p, 
      dni_d : data.dni_d, 
    }
    horascitaDetail ={
      hora_inicio : data.hora_inicio.substring(0,2),
      minuto_inicio: data.hora_inicio.substring(3,5),
      hora_fin : data.hora_fin.substring(0,2),
      minuto_fin : data.hora_fin.substring(3,5),

    }
    setHorascita(horascitaDetail)
    
    }else{
      citeNew = {
        ...cite,
        dni_p: patient.dni_p,
        dni_d: user.dni_d
      }
    }
    setCite(citeNew)
  }

  const handleSubmit= async (e) =>{
    e.preventDefault();
    let finalCite = {}

    finalCite = {
      ...cite,
      hora_inicio: horascita.hora_inicio + ':'+ horascita.minuto_inicio,
      hora_fin: horascita.hora_fin + ':'+ horascita.minuto_fin
    }
    setloading(true);
    if (editing){
        await fetch(`${url}/citas/${params.id}`,{
            method: "PUT",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(finalCite)
        })
        
    } else{
      await fetch(`${url}/citas`,
      {

          method:'POST',
          headers: {'Content-type':'application/json'},
          body: JSON.stringify(finalCite),
      })
    }
    setloading(false);
    navigate('/citas/',{state:patient})

  }

  const handleChange = e=>{
    if (e.target.name === 'hora_inicio' || e.target.name === 'minuto_inicio' || e.target.name === 'hora_fin' || e.target.name === 'minuto_fin' ) {
      setHorascita({...horascita,[e.target.name]: e.target.value});
    }
    else{
      setCite({...cite,[e.target.name]: e.target.value});
    }
    

    
  }

  useEffect(()=> {
    if (!logged) {
      navigate('/')
    }
    else{
      loadCite()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div>
      <div className=" p-5 flex justify-center flex-col items-center">
      <div>
      <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
      <BiCalendar size={40} color={"#3693E9"} ></BiCalendar>  
      {editing ? "Modificar Prueba":"Formulario de Registro de Citas"}
      </div>
      <div className="box-table">
      <form onSubmit={handleSubmit}>
        <div className="p-4 flex justify-center items-center flex-col px-56">
        <BsFillCalendar2PlusFill size={120} color={"#3693E9"} ></BsFillCalendar2PlusFill>

        <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Fecha de Cita</h1>
        <div className="mb-3 xl:w-96">
          <input type="date" 
          className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
                 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
               dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow"
                onChange={handleChange} name="fecha" value={cite.fecha || ""}>
          </input>
        </div>

        <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Paciente</h1>
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <select className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
               ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
             dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow"
              name="dni_p" onChange={handleChange} value={cite.dni_p} required disabled>
                <option value={patient.dni_p}>{patient.nombres} {patient.apellidos}</option>
              </select>
            </div>
          </div>

        <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Hora Inicio</h1>
          <div className="flex justify-center">
            <div className="py-2 px-4 w-auto bg-gray-200 rounded-lg shadow-xl">
              <div className="flex">
                <select name="hora_inicio" className="bg-transparent text-xl appearance-none outline-none" value={horascita.hora_inicio} onChange={handleChange} required>
                  <option value="">--</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="00">00</option>

                </select>
                <span className="text-xl mr-3">:</span>
                <select name="minuto_inicio" className="bg-transparent text-xl appearance-none outline-none" value={horascita.minuto_inicio}  onChange={handleChange} required>
                  <option value="">--</option>
                  <option value="00">00</option>
                  <option value="05">05</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                </select>
              </div>
            </div>
          </div>

          <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Hora Fin</h1>
          <div className="flex justify-center">
            <div className="py-2 px-4 w-auto bg-gray-200 rounded-lg shadow-xl">
              <div className="flex">
                <select name="hora_fin" className="bg-transparent text-xl appearance-none outline-none"  value={horascita.hora_fin} onChange={handleChange} required>
                  <option value="">--</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="00">00</option>

                </select>
                <span className="text-xl mr-3">:</span>
                <select name="minuto_fin" className="bg-transparent text-xl appearance-none outline-none" value={horascita.minuto_fin} onChange={handleChange} required>
                  <option value="">--</option>  
                  <option value="00">00</option>
                  <option value="05">05</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                  <option value="35">35</option>
                  <option value="40">40</option>
                  <option value="45">45</option>
                  <option value="50">50</option>
                  <option value="55">55</option>
                </select>
              </div>
            </div>
          </div>



        </div>
        <div className="flex justify-between py-2">
        <button type="submit" className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full disabled:bg-gray-400"  
          disabled={!cite.fecha || !horascita.hora_inicio || !horascita.hora_fin}>
        { loading ? "Cargando.." : "Guardar" }
        </button>
        <button type="button" className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full" onClick={() => (window.history.back())}>
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

export default CitesForm