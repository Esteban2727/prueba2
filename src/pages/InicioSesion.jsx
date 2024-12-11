import "./styleInicioSesion.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BsFillPersonFill, BsTrophy } from "react-icons/bs"; // Importar el icono del trofeo


export default function InicioSesion() {
  const navigate = useNavigate();

  // Comprobar si el usuario ha iniciado sesión
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/error"); // Redirige a la página de error si no hay token
    }
  }, [navigate]);

  return (
    <div className="pagina_principal">
      <div className="header_cuerpo">
      <div className="icon-container">
          <BsFillPersonFill
                    className="edit_profile"
                    onClick={() => {
                      navigate("/Perfil")
                     }}
                />

          <BsTrophy
            className="best_scores_icon"
            onClick={() => {
              navigate("/mejorespuntuaciones")
            }}
          />
        </div>
      <div className="first-container">
  

        <p className="titulo_paginaPrincipal">GAME ON</p>
      </div>
      </div>

      <div className="video_games">
  
        <div className="juegos triqui">
          <img
            src="https://dl.memuplay.com/new_market/img/tic.tac.toe.two.player.board.games.icon.2022-06-26-09-40-46.png"
            alt="triqui"
            onClick={() => {
              navigate("/triqui");
            }}
          />
        </div>

        <div className="juegos juntar_parejas">
          <img
            src="https://www.cokitos.com/wp-content/uploads/2022/06/memory-master-frutas.jpg"
            alt="juntar parejas"
            onClick={() => {
              navigate("/juntarparejas");
            }}
          />
        </div>

        {/* Juego del ahorcado */}
        <div className="juegos ahorcado">
          <img
            src="https://th.bing.com/th/id/OIG2.Ata0aei4iZ25c.b.07Nn?pid=ImgGn"
            alt="ahorcado"
            onClick={() => {
              navigate("/ahorcado");
            }}
          />
        </div>
      </div>
    </div>
  );
}
