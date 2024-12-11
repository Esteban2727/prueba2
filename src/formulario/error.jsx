import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Regresar a la página anterior
  };

  const handleGoHome = () => {
    navigate("/"); // Ir a la página principal
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Error 401</h1>
      <p style={styles.message}>No estás autorizado para acceder a esta página.</p>
      <div style={styles.buttons}>
        <button style={styles.button} onClick={handleGoBack}>
          Regresar
        </button>
        <button style={styles.button} onClick={handleGoHome}>
          Página principal
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    marginTop: "10%",
  },
  title: {
    fontSize: "3rem",
    color: "#FF6347",
  },
  message: {
    fontSize: "1.5rem",
    margin: "1rem 0",
  },
  buttons: {
    marginTop: "2rem",
  },
  button: {
    padding: "10px 20px",
    margin: "0 10px",
    fontSize: "1rem",
    backgroundColor: "#FF6347",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#FF4500",
  },
};

export default Error404;
