import Home from "./pages/Home";
import Register from "./formulario/Register";
import Login from "./formulario/Login";
import InicioSesion from "./pages/InicioSesion";
import Triqui from "./juegos/Triqui";
import RecibirTriqui from "./juegos/recibirTriqui";
/* import JuntarParejas from "./juegos/JuntarParejas"; */


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
 /*   { path:"JuntarParejas", element: <JuntarParejas /> }, */
   { path:"Perfil", element: <Perfil/> },
  
   
  
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
export default App;
