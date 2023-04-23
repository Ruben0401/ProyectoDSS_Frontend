import React from 'react'
import {BiLeftArrowCircle} from 'react-icons/bi'
import ImgPaciente from '../img/AvatarPaciente.png'
import ImgMedico from '../img/AvatarMedico.png'
import {useLocation,useParams,useNavigate } from 'react-router-dom'
import {useEffect,useState,useContext} from 'react'
import {url} from '../config/config'
import {Contexts} from './../context/Contexts'

function MessagesDetail() {
   const navigate = useNavigate();
   const {user,logged} = useContext(Contexts)
   const {state:roommessage} = useLocation();
   const [input, setInput] = useState('');
   const params = useParams();
   const [loading, setloading] = useState(false);
   const [messages, setmessages] = useState([])
   const [patient, setpatient] = useState({

      dni_p : '',
      nombres : '', 
      apellidos : '', 
      fecha_nacimiento : '', 
      sexo : '', 
      edad : '', 
      telefono : '', 
      correo : '', 
      direccion : '', 
      password_p : '',

    }) 
   const [message, setmessage] = useState({
      dni_d : '',
      id_sala : '', 
      texto : '', 
   })

   const handleSubmit= async (e) =>{
      e.preventDefault();
  
      setloading(true);
      //Registrar Sala de los mensajes
        let messageNew={}  
        messageNew = {
          ...message,
          dni_d:user.dni_d,
          id_sala: roommessage.id_sala
        }
        setmessage(messageNew)
        await fetch(`${url}/mensajes/d`,
        {
            method:'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(messageNew),
        })
      //Registrar Sala de los mensajes
        setloading(false);
        setInput('')
   }
   const handleChange = e=>{
      setInput(e.target.value);
      setmessage({...message,[e.target.name]: e.target.value});
   }
   const loadPatient = async()=>{
      const res=await fetch(`${url}/pacientes/${roommessage.dni_p}`)
      const data= await res.json()
      setpatient({
        dni_p : data.dni_p,
        nombres : data.nombres, 
        apellidos : data.apellidos, 
        fecha_nacimiento : data.fecha_nacimiento.substring(0, 10), 
        sexo : data.sexo, 
        edad : data.edad, 
        telefono : data.telefono, 
        correo : data.correo, 
        direccion : data.direccion, 
        password_p : data.password_p,
      })
    }
    const loadMessages= async ()=>{
      let id = params.id;
      const response = await fetch(`${url}/mensajes/${id}`)
      const data = await response.json()
      setmessages(data)
    }
   useEffect(()=>{
      if (!logged) {
         navigate('/')
       }
       else{
         loadPatient()
         loadMessages()
         let intervalID = setInterval(loadMessages, 1000);
         return ()=>{
            clearInterval(intervalID)
            // cleanup
        }
       }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
   <div>
    <div className=" p-5 flex justify-center flex-col items-center">
    <div>
    <div className=" flex items-center gap-2 py-2">
    <img className="inline-block h-12 w-12 rounded-full ring-2 ring-black" src={ImgPaciente} alt=""/>
    <h1 className="px-2 text-base font-semibold tracking-wide text-center font-sans text-black">Paciente:</h1> 
    <h1 className=" text-base font-semibold tracking-wide text-center font-sans text-black">{patient.nombres} {patient.apellidos}</h1>
    </div>
    <div className="box-table ">
      <div className="flex justify-between py-1">
          <div>
          </div>
          <button onClick={() => (window.history.back())}>
            <BiLeftArrowCircle size={40} color={"#3693E9"} ></BiLeftArrowCircle>
          </button>
      </div>
      <div className="p-4 flex justify-center items-center flex-col px-20">



      
      {
         messages.map((message) =>(
            <div className="chat-message py-2" key={message.id_mensaje}>
            <div className="flex items-end">
               <div className="flex flex-col space-y-2 text-sm max-w-2xl mx-2 order-2 items-start">
                  <div>
                     <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-black">
                        {message.texto}
                     </span>
                  </div>
               </div>
               <img src={ message.dni_p ? ImgPaciente : ImgMedico} alt="My profile" className="w-10 h-10 rounded-full order-1 ring-black ring-1"/>
            </div>
         </div>
         )

         )
      }

      <div className=" pt-44 mb-2 ">
        <form className="flex justify-between py-1" onSubmit={handleSubmit}>
           <textarea type="text" placeholder="Escribe tu mensaje aquí" 
            className="bg-gray-100 placeholder:text-center" cols={80} rows={4}
            value={input} name="texto" onChange={handleChange} 
           />
           <div>
              <button type="submit" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white 
               bg-[#3693E9] hover:bg-blue-400 focus:outline-none disabled:bg-gray-400" disabled={!input}  >
                 <span className="font-bold">{ loading ? "Cargando.." : "Enviar" }</span>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                 </svg>
              </button>
           </div>
        </form>
      </div>
      
      </div>

    </div>
    </div>

      </div>
   </div>

  )
}

export default MessagesDetail