import Home from "./pages/Home";
import Register from "./formulario/Register";
import Login from "./formulario/Login";
import InicioSesion from "./pages/InicioSesion";
import JuntarParejas from "./juegos/JuntarParejas";
import RecibirTriqui from "./juegos/recibirTriqui";
import MejoresPuntuaciones from "./juegos/mejorespuntuaciones";
import Error404 from "./formulario/error";
import Ahorcado from "./juegos/Ahorcado";
import Recuperar from "./pages/recuperar";
import RestablecerContrasena from "./pages/solicitar";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import "./app.css";
import Perfil from "./juegos/perfil";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { path:"/", element: <Login /> },
      
      { path: "/register", element: <Register /> },
      
    ],
   
  },
   { path: "/inicioSesion", element: <InicioSesion /> ,
   },
   { path:"triqui", element: <RecibirTriqui /> },
   { path:"JuntarParejas", element: <JuntarParejas /> },
 /*   { path:"JuntarParejas", element: <JuntarParejas /> }, */
  { path:"Perfil", element: <Perfil/> },
  { path:"/error", element: <Error404/> },
  { path:"*", element: <Error404/>  },
  { path:"/mejorespuntuaciones", element: <MejoresPuntuaciones/> },
  { path:"/ahorcado", element: <Ahorcado/> },
  { path:"/recuperar", element: <Recuperar/> },
  { path:"/resetear-contrasena/:uidb64/:token", element: <RestablecerContrasena/> },
  

   

   

   
  
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
export default App;
