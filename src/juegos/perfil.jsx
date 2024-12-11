import "./profile.css";
import { BsEmojiLaughingFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import Error404 from "../formulario/error";
import { useNavigate } from "react-router-dom";
import { BsFillHouseCheckFill } from "react-icons/bs";

export default function Perfil() {
  const [infoPerfil, setInfoPerfil] = useState({});
  const [values5, setValues5] = useState({
    username: "",
    correo: "",
  });
  const [puntuacion, setPuntuacion] = useState(null);
  const navigate = useNavigate()
  function FunctionHandle(event) {
    const { name, value } = event.target;
    setValues5((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }
function cerrar(){
  console.log("gola")
  localStorage.setItem("accessToken",false)
  navigate("/");
}
  useEffect(() => {
    async function DatosUsuario() {
      const accessToken = localStorage.getItem("accessToken");
      console.log("Access Token enviado al backend:", accessToken);

      if (!accessToken) {
        navigate("/error");
        console.error("No se encontró el token de acceso.");
        return;
      }

      try {
        const url = "http://localhost:5000/perfil/";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Datos del perfil:", data);
          setInfoPerfil(data);
          setValues5({
            username: data.username || "",
            correo: data.correo || "",
          });
          setPuntuacion(data.puntuacion || null);
        } else {
          navigate("/error");
          console.error("Error en la respuesta del servidor:", await response.text());

        }
      } catch (error) {
        navigate("/error");
        console.error("Error al obtener datos:", error);
      }
    }

    DatosUsuario();
  }, []);
console.log(puntuacion)
  async function updateProfile(event) {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("No se encontró el token de acceso.");
      return;
    }

    try {
      const url = "http://localhost:5000/perfil/update/";
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(values5),
      });

      if (response.ok) {
        const data = await response.json();
        setInfoPerfil(data);
        console.log(data);
        alert("Perfil actualizado correctamente");
      } else {
        alert("No se pudo actualizar el perfil, usuario o correo ya existentes");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  }

  return (
    <div className="main_main">
      <div className="icono3">
                <BsFillHouseCheckFill
                    className="edit_home_profile"
                    onClick={() => {
                        navigate("/inicioSesion")
                       }}
                />
            </div>
      <button onClick={()=>{cerrar()}}> Cerrar sesión</button>      
      <div className="container_main_profile">
        <div className="container_main_profile__image">
          <BsEmojiLaughingFill className="edit_icon_Profile" />
        </div>
        <div className="container_main_profile__datas">
          <p className="letter_style">{infoPerfil.username}</p>
          <p className="letter_style">{infoPerfil.correo}</p>

          <div className="puntuaciones">
          <h3 className="mejorPuntuacion">Mejor Puntuación</h3>
          {puntuacion ? (
            <div className="intentos">
              <p>Intentos: {puntuacion.intentos}</p>
              <p>Fecha: {new Date(puntuacion.fecha).toLocaleString()}</p>
            </div>
          ) : (
            <p>No hay puntuaciones disponibles.</p>
          )}
        </div>

        </div>
      </div>

      <div className="container_informationBuy">
        <div className="container_informationBuy__products">
          <form className="editar" onSubmit={updateProfile}>
            <div>
              <p>
                Username:{" "}
                <input
                  type="text"
                  name="username"
                  value={values5.username}
                  placeholder={infoPerfil.username || "Escribe tu username"}
                  className="organizar"
                  onChange={FunctionHandle}
                />
              </p>
            </div>
            <hr className="edit1" />
            <div>
              <p>
                Email:{" "}
                <input
                  type="email"
                  name="correo"
                  value={values5.correo}
                  placeholder={infoPerfil.correo || "Escribe tu email"}
                  className="organizar"
                  onChange={FunctionHandle}
                />
              </p>
            </div>
            <div>
              <button type="submit">Actualizar</button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}
