import React, { useState } from 'react';
import './recuperarContrasena.css';

export default function SolicitarRecuperacion() {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/solicitar-recuperacion/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo }),
      });
      const data = await response.json();
      setMensaje(data.message || data.error);
    } catch (error) {
      setMensaje('Error al solicitar la recuperación.');
    }
  };

  return (
    <div className="recovery-container">
      <div className="animated-bg"></div>
      <div className="particle-overlay"></div>
      <div className="recovery-card">
        <h2 className="recovery-title">🌌 Recupera tu Contraseña</h2>
        <p className="recovery-description">
          Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu acceso.
        </p>
        <form className="recovery-form" onSubmit={handleSubmit}>
          <input
            className="recovery-input"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Correo Electrónico"
            required
          />
          <button className="recovery-button" type="submit">Enviar</button>
        </form>
        {mensaje && <p className="recovery-message">{mensaje}</p>}
      </div>
    </div>
  );
}
