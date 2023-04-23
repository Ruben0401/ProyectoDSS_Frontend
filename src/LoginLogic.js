import React,{useContext} from 'react'
import Principal from './components/Principal'
import Patients from './components/Patients'
import Messages from './components/Messages'
import Notifications from './components/Notifications'
import NotificationDetail from './components/NotificationDetail'
import InfectedLocation from './components/InfectedLocation'
import InfectedLocationDetail from './components/InfectedLocationDetail'
import PatientDetail from './components/PatientDetail'
import PatientForm from './components/PatientForm'
import Diagnostics from './components/Diagnostics'
import Tests from './components/Tests'
import MessagesDetail from './components/MessagesDetail'
import DiagnosticDetail from './components/DiagnosticDetail'
import DiagnosticForm from './components/DiagnosticForm'
import TestForm from './components/TestForm'
import TestDetail from './components/TestDetail'
import MessagesForm from './components/MessagesForm'
import Login from './components/Login'
import LandingPage from './components/LandingPage'
import RegisterDoctor from './components/RegisterDoctor'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Cites from './components/Cites'
import CitesDetail from './components/CitesDetail'
import CitesForm from './components/CitesForm'
import {Contexts} from './context/Contexts'
import Navbar from './components/Navbar'

function LoginLogic() {
    const {logged} = useContext(Contexts) 
  return (
    
    <BrowserRouter >
      {(!logged)?
        (<></>):
        <Navbar/>
      } 
      <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/registrarse/new' element={<RegisterDoctor/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/principal' element={ <Principal/>} />
      {/* Pacientes */}
      <Route path='/pacientes' element={<Patients/>} />
      <Route path='/pacientes/:dni' element={<PatientDetail/>} />
      <Route path='/pacientes/new' element={<PatientForm/>} />
      <Route path='/pacientes/:dni/edit' element={<PatientForm/>} />
      {/* Pacientes */} 

      {/* Diagnosticos */}
      <Route path='/diagnosticos/' element={<Diagnostics/>} />
      <Route path='/diagnosticos/:id/detail' element={<DiagnosticDetail/>} />
      <Route path='/diagnosticos/new' element={<DiagnosticForm/>} />
      <Route path='/diagnosticos/:id/edit' element={<DiagnosticForm/>} />
      {/* Diagnosticos */}

      {/* Pruebas */}
      <Route path='/pruebas/' element={<Tests/>} />
      <Route path='/pruebas/:id/detail' element={<TestDetail/>} />
      <Route path='/pruebas/new' element={<TestForm/>} />
      <Route path='/pruebas/:id/edit' element={<TestForm/>} />
      
      {/* Pruebas */}

      {/* Citas */}
      <Route path='/citas/' element={<Cites/>} />
      <Route path='/citas/:id/detail' element={<CitesDetail/>} />
      <Route path='/citas/new' element={<CitesForm/>} />
      <Route path='/citas/:id/edit' element={<CitesForm/>} />
      {/* Citas */}


      {/* Mensajes */}
      <Route path='/mensajes' element={<Messages/>} />
      <Route path='/mensajes/:id' element={<MessagesDetail/>} />
      <Route path='/mensajes/new' element={<MessagesForm/>} />
      {/* Mensajes */}

      {/* Notificaciones */}
      <Route path='/notificaciones' element={<Notifications/>} />
      <Route path='/notificaciones/:id' element={<NotificationDetail/>} />
      {/* Notificaciones */}

      {/* Ubicacion de Infectados */}
      <Route path='/infectados' element={<InfectedLocation/>} />
      <Route path='/infectados/:id' element={<InfectedLocationDetail/>} />
      {/* Ubicacion de Infectados */}
      </Routes>
    </BrowserRouter>
  )
}

export default LoginLogic