import React from 'react'
import {BiTestTube} from 'react-icons/bi'
import {SiMinetest} from 'react-icons/si'
import { useNavigate,useParams,useLocation } from 'react-router-dom'
import {useState,useEffect,useContext} from 'react'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'

function TestForm() {
    const {logged} = useContext(Contexts)
    const navigate=useNavigate();
    const params = useParams();
    const [loading, setloading] = useState(false);
    const [editing, setediting] = useState(false);
    const [test, settest] = useState({
      fecha_prueba : '',
      dni_p : '',
      tipo_prueba : '', 
      laboratorio : '', 
      resultado : '', 
    }) 
    const {state:patient} = useLocation();

    const loadTest = async()=>{
      let id = params.id
      let testNew = {}
      if(id){
      setediting(true)
      const res=await fetch(`${url}/pruebas/${id}/info`)
      const data= await res.json()
      testNew = {
        fecha_prueba : data.fecha_prueba.substring(0,10),
        dni_p: data.dni_p,
        tipo_prueba : data.tipo_prueba,
        laboratorio : data.laboratorio, 
        resultado : data.resultado, 
      }

      }else{
        testNew = {
          ...test,
          dni_p: patient.dni_p,
          tipo_prueba:'COVID-19',
        }
      }
      settest(testNew)
    }

    const handleSubmit= async (e) =>{
      e.preventDefault();

      setloading(true);
      if (editing){
          await fetch(`${url}/pruebas/${params.id}`,{
              method: "PUT",
              headers: {"Content-Type":"application/json"},
              body: JSON.stringify(test)
          })
          
      } else{
        await fetch(`${url}/pruebas`,
        {

            method:'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(test),
        })
      }
      setloading(false);
      navigate('/pruebas/',{state:patient})

    }

    const handleChange = e=>{
      settest({...test,[e.target.name]: e.target.value});
      
    }

    useEffect(()=> {
      if (!logged) {
        navigate('/')
      }
      else{
        loadTest()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div>
    <div className=" p-5 flex justify-center flex-col items-center">
    <div>
    <div className=" flex items-center gap-2 font-semibold text-xl font-[inter] py-3">
    <BiTestTube size={40} color={"#3693E9"} ></BiTestTube>  
    {editing ? "Modificar Prueba":"Formulario de Registro de Pruebas"}
    </div>
    <div className="box-table">
    <form onSubmit={handleSubmit}>
      <div className="p-4 flex justify-center items-center flex-col px-56">
      <SiMinetest size={120} color={"#3693E9"} ></SiMinetest>

      <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Fecha de Prueba</h1>
      <div className="mb-3 xl:w-96">
        <input type="date" 
        className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
               ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
             dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow"
              onChange={handleChange} name="fecha_prueba" value={test.fecha_prueba || ""}>
        </input>
      </div>

      <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Paciente</h1>
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <select className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
             ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
           dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow"
            name="dni_p" onChange={handleChange} value={test.dni_p} required disabled>
              <option value={patient.dni_p}>{patient.nombres} {patient.apellidos}</option>
            </select>
          </div>
        </div>

      <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Enfermedad a Comprobar</h1>
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <select className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
             ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
           dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow"
              name="tipo_prueba" onChange={handleChange} value={test.tipo_prueba} required disabled>
              <option value="COVID-19">COVID-19</option>
            </select>
          </div>
        </div>

      <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Laboratorio</h1>
      <div className="relative mb-3 xl:w-96" >
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
              ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
               dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder overflow-auto shadow "
              placeholder="Escribe aquí el Laboratorio" name="laboratorio" onChange={handleChange} value={test.laboratorio || ""} />
        </div>

      <h1 className="p-3 text-base font-semibold tracking-wide text-center font-sans text-black" >Resultado</h1>
        <div className="flex justify-center">
          <div className="mb-3 xl:w-96">
            <select className="peer block min-h-[auto] w-full rounded-lg border-0 bg-gray-100 py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 
             ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-black
           dark:placeholder:text-black [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0 overflow-auto shadow"
              name="resultado" onChange={handleChange} value={test.resultado} required>
              <option value=""> -- Selecciona Resultado -- </option>
              <option value="Positivo">Positivo</option>
              <option value="Negativo">Negativo</option>
            </select>
          </div>
        </div>


  
      </div>
      <div className="flex justify-between py-2">
      <button type="submit" className="bg-[#3693E9] hover:bg-[#3fa2ff] text-white font-bold py-2 px-10 rounded-full disabled:bg-gray-400"  
        disabled={!test.fecha_prueba || !test.laboratorio || !test.resultado  }>
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

export default TestForm