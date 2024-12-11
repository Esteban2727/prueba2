import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function RestablecerContrasena() {
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { token } = useParams(); // Obtiene el token desde la URL.

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/resetear-contrasena/${token}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nueva_contrasena: nuevaContrasena }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMensaje(data.message);
      } else {
        const errorData = await response.json();
        setMensaje(errorData.error || "Error desconocido al restablecer la contraseña.");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={nuevaContrasena}
          onChange={(e) => setNuevaContrasena(e.target.value)}
          placeholder="Nueva Contraseña"
          required
        />
        <button type="submit">Restablecer</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
