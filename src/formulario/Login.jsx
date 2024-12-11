import { useState } from "react";
import { Navigate, NavLink,useNavigate } from "react-router-dom";
import "./styleRegister.css";
import Swal from "sweetalert2";
export default function Login() {
  
  const [message, setMessage] = useState("")
  const [getDataLogin,SetgetDatasLogin]=useState({
    correo :"",
    password:"",
  })
  const navigate=useNavigate()

  const CatchDatas=(e)=>{
    const {name,value}=e.target
    SetgetDatasLogin({
      ...getDataLogin,
      [name]:value
    })
  }

const handlerLogin = async(e)=>{
  //decirle que no haga un comportamiento por defecto del navegador
  e.preventDefault()
  

  const url= 'http://localhost:5000/login_view/'
  const response=await fetch(url,{
    method:"POST",
    
    headers:{
      'Content-Type': 'application/json', 
    },

    body: JSON.stringify(getDataLogin), 
  })
  
  if(response.ok){
    
    
    const data = await response.json();  
    console.log(data)
     localStorage.setItem('accessToken', data.access);
     localStorage.setItem('refreshToken', data.refresh);
    Swal.fire({
      title: "Good job!",
      text: "yo have been signed up correctly",
      icon: "success"

    
    })
    navigate("inicioSesion")
   }
   else{
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!, dont repeat Email",
    
    })
  }
  
  }


  return (
    <div className="container__input">
        <p className="title">INICIAR</p>

      <label className="label" htmlFor="username">
        Correo
      </label>

      <input
        id="username"
        type="email"
        className="for_input username"
        name="correo"
        value={getDataLogin.correo}
        onChange={CatchDatas}
        placeholder="ingrese su correo"
      />


      <label className="label" htmlFor="password">
        Contraseña
      </label>

      <input
        id="password"
        type="password"
        name="password"
        value={getDataLogin.password}
        className="for_input password"
        onChange={CatchDatas}
        placeholder="contraseña"
      />
      {message}
    <div className="info-text">
         no tienes una cuenta ? registrate <NavLink className="here" to={'/register'}>aqui</NavLink>
      </div>
      <div className="info-text">
          <NavLink className="here" to={'/recuperar'}>recuperar Contraseña</NavLink>
      </div>
      <div className="button-register" onClick={handlerLogin}>
        Iniciar
      </div>

    </div>
  );
}
