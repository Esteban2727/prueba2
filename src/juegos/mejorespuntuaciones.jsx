import React, { useState, useEffect } from "react";
import "./StyleMejoresPuntuaciones.css";
import { BsFillHouseCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function MejoresPuntuaciones() {
  const [puntuaciones, setPuntuaciones] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPuntuaciones = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.error("No se encontró el token de acceso.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/mejores-puntuaciones/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Ordenamos las puntuaciones de menor a mayor por el campo 'intentos'
          const puntuacionesOrdenadas = data.mejores_puntuaciones.sort((a, b) => a.intentos - b.intentos);
          // Mostramos solo los 5 primeros
          setPuntuaciones(puntuacionesOrdenadas.slice(0, 5));
        } else {
          setMensaje("Error al obtener las mejores puntuaciones");
        }
      } catch (error) {
        setMensaje("Error al obtener las mejores puntuaciones");
        console.error("Error:", error);
      }
    };

    obtenerPuntuaciones();
  }, []);

  return (
    <div className="body_puntuacion">
      <div className="icono3">
                <BsFillHouseCheckFill
                    className="edit_home_profile"
                    onClick={() => {
                        navigate("/inicioSesion")
                       }}
                />
            </div>
    <div className="container">
      <h2 className="titulo_puntuaciones">Mejores Puntuaciones</h2>
      {mensaje && <p className="error-message">{mensaje}</p>}
      {puntuaciones.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Jugador</th>
              <th>Puntuación</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {puntuaciones.map((puntuacion) => (
              <tr key={puntuacion.id}>
                <td>{puntuacion.username}</td>
                <td>{puntuacion.intentos}</td>
                <td>{new Date(puntuacion.fecha).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay puntuaciones disponibles.</p>
      )}
    </div>
    </div>
  );
}
