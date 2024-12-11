import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './restablecerContrasena.css';

export default function RestablecerContrasena() {
  const { uidb64, token } = useParams();
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/resetear-contrasena/${uidb64}/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nueva_contrasena: nuevaContrasena }),
      });
      const data = await response.json();
      setMensaje(data.message || data.error);
    } catch (error) {
      setMensaje('Error al restablecer la contraseña.');
    }
  };

  return (
    <div className="reset-container">
      <div className="animated-bg"></div>
      <div className="particle-overlay"></div>
      <div className="reset-card">
        <h2 className="reset-title">🔒 Restablece tu Contraseña</h2>
        <p className="reset-description">
          Ingresa tu nueva contraseña para recuperar acceso a tu cuenta.
        </p>
        <form className="reset-form" onSubmit={handleSubmit}>
          <input
            className="reset-input"
            type="password"
            value={nuevaContrasena}
            onChange={(e) => setNuevaContrasena(e.target.value)}
            placeholder="Nueva Contraseña"
            required
          />
          <button className="reset-button" type="submit">Restablecer</button>
        </form>
        {mensaje && <p className="reset-message">{mensaje}</p>}
      </div>
    </div>
  );
}
