import React from 'react'

const Contexts = React.createContext();

const ContextsProvider =({children})=>{
    const [user, setuser] = React.useState({

        dni_d : '',
        nombres : '', 
        apellidos : '', 
        fecha_nacimiento : '', 
        sexo : '', 
        edad : '', 
        telefono : '', 
        correo : '', 
        especialidad : '', 
        password_d : '',
  
      })
      const [logged,setlogged]=React.useState(false)
    return(
        <Contexts.Provider value={{
            user, setuser,logged,setlogged}}>
            {children}
        </Contexts.Provider>
    )
}

export {Contexts,ContextsProvider}